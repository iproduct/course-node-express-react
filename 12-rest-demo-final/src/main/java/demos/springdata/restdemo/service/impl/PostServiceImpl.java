package demos.springdata.restdemo.service.impl;

import com.fasterxml.jackson.annotation.JsonView;
import demos.springdata.restdemo.dao.PostRepository;
import demos.springdata.restdemo.dao.UserRepository;
import demos.springdata.restdemo.events.PostCreationEvent;
import demos.springdata.restdemo.exception.EntityNotFoundException;
import demos.springdata.restdemo.exception.InvalidEntityException;
import demos.springdata.restdemo.model.Post;
import demos.springdata.restdemo.model.User;
import demos.springdata.restdemo.model.Views;
import demos.springdata.restdemo.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostServiceImpl  implements PostService {

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public Collection<Post> getPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        return postRepo.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Post with ID=%s not found.", id)));
    }

    @Override
    public Post createPost(@Valid Post post) {
        Long authorId;
        if(post.getAuthor() != null && post.getAuthor().getId() != null) {
            authorId = post.getAuthor().getId();
        } else {
            authorId = post.getAuthorId();
        }
        if(authorId != null) {
            User author = userRepo.findById(authorId)
                    .orElseThrow(() -> new InvalidEntityException("Author with ID=" + authorId + " does not exist."));
            post.setAuthor(author);
        }
        if(post.getCreated() == null) {
            post.setCreated(new Date());
        }
        post.setModified(post.getCreated());

        return postRepo.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        post.setModified(new Date());
        Post old = getPostById(post.getId());
        if(post.getAuthor() != null && post.getAuthor().getId() != old.getAuthor().getId())
            throw new InvalidEntityException("Author of article could not ne changed");
        post.setAuthor(old.getAuthor());
        return postRepo.save(post);
    }

    @Override
    public Post deletePost(Long id) {
        Post old = postRepo.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Post with ID=%s not found.", id)));
        postRepo.deleteById(id);
        return old;
    }

    @Override
    public long getPostsCount() {
        return postRepo.count();
    }

    // Declarative transaction
    @Transactional
    public List<Post> createPostsBatch(List<Post> posts) {
        List<Post> created = posts.stream()
                .map(post -> {
                    Post resultPost = createPost(post);
                    applicationEventPublisher.publishEvent(new PostCreationEvent(resultPost));
                    return resultPost;
                }).collect(Collectors.toList());
        return created;
    }

////    Programmatic transaction
//    public List<Post> createPostsBatch(List<Post> articles) {
//        return transactionTemplate.execute(new TransactionCallback<List<Post>>() {
//            // the code in this method executes in a transactional context
//            public List<Post> doInTransaction(TransactionStatus status) {
//                List<Post> created = articles.stream()
//                        .map(article -> {
//                            try {
//                                return addPost(article);
//                            } catch (ConstraintViolationException ex) {
//                                log.error(">>> Constraint violation inserting articles: {} - {}", article, ex.getMessage());
//                                status.setRollbackOnly();
//                                return null;
//                            }
//                        }).collect(Collectors.toList());
//                return created;
//            }
//        });
//    }

//    // Managing transaction directly using PlatformTransactionManager
//    public List<Post> createPostsBatch(List<Post> articles) {
//        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
//        // explicitly setting the transaction name is something that can only be done programmatically
//        def.setName("createPostsBatchTransaction");
//        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
//        def.setTimeout(5);
//
//        // Do in transaction
//        TransactionStatus status = transactionManager.getTransaction(def);
//        List<Post> created = articles.stream()
//            .map(article -> {
//                try {
//                    Post resultPost = addPost(article);
//                    applicationEventPublisher.publishEvent(new PostCreationEvent(resultPost));
//                    return resultPost;
//                } catch (ConstraintViolationException ex) {
//                    log.error(">>> Constraint violation inserting article: {} - {}", article, ex.getMessage());
//                    transactionManager.rollback(status); // ROLLBACK
//                    throw ex;
//                }
//            }).collect(Collectors.toList());
//
//        transactionManager.commit(status); // COMMIT
//        return created;
//    }

    @TransactionalEventListener
    public void handlePostCreatedTransactionCommit(PostCreationEvent creationEvent) {
        log.info(">>> Transaction COMMIT for article: {}", creationEvent.getPost());
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
    public void handlePostCreatedTransactionRollaback(PostCreationEvent creationEvent) {
        log.info(">>> Transaction ROLLBACK for article: {}", creationEvent.getPost());
    }

}
