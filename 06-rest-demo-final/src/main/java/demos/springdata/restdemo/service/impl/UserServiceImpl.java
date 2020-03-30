package demos.springdata.restdemo.service.impl;

import demos.springdata.restdemo.dao.PostRepository;
import demos.springdata.restdemo.dao.UserRepository;
import demos.springdata.restdemo.events.UserCreationEvent;
import demos.springdata.restdemo.exception.InvalidEntityException;
import demos.springdata.restdemo.model.Post;
import demos.springdata.restdemo.model.User;
import demos.springdata.restdemo.service.PostService;
import demos.springdata.restdemo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public Collection<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public User createUser(User user) {
        userRepo.findByUsername(user.getUsername()).ifPresent(u -> {
            throw new InvalidEntityException(String.format("User with username '%s' already exists.", user.getUsername()));
        });
        user.setCreated(new Date());
        user.setModified(new Date());
        if(user.getRoles() == null || user.getRoles().length() == 0) {
            user.setRoles("ROLE_USER");
        }
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);
        return userRepo.save(user);
    }

    @Override
    @Transactional
    public User updateUser(User user) {
        user.setModified(new Date());
        return userRepo.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with ID=%s not found.", id)));
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(() ->
                new EntityNotFoundException(String.format("User '%s' not found.", username)));
    }

    @Override
    public User deleteUser(Long id) {
        User old = userRepo.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with ID=%s not found.", id)));
        userRepo.deleteById(id);
        return old;
    }

    @Override
    public long getUsersCount() {
        return userRepo.count();
    }

    // Declarative transaction
    @Transactional
    public List<User> createUsersBatch(List<User> users) {
        List<User> created = users.stream()
                .map(user -> createUser(user))
                .collect(Collectors.toList());
        return created;
    }

////    Programmatic transaction
//    public List<User> createUsersBatch(List<User> users) {
//        return transactionTemplate.execute(new TransactionCallback<List<User>>() {
//            // the code in this method executes in a transactional context
//            public List<User> doInTransaction(TransactionStatus status) {
//                List<User> created = users.stream()
//                        .map(user -> {
//                            try {
//                                return createUser(user);
//                            } catch (ConstraintViolationException ex) {
//                                log.error(">>> Constraint violation inserting users: {} - {}", user, ex.getMessage());
//                                status.setRollbackOnly();
//                                return null;
//                            }
//                        }).collect(Collectors.toList());
//                return created;
//            }
//        });
//    }

    // Managing transaction directly using PlatformTransactionManager
//    public List<User> createUsersBatch(List<User> users) {
//        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
//        // explicitly setting the transaction name is something that can only be done programmatically
//        def.setName("createUsersBatchTransaction");
//        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
//        def.setTimeout(5);
//
//        // Do in transaction
//        TransactionStatus status = transactionManager.getTransaction(def);
//        List<User> created = users.stream()
//            .map(user -> {
//                try {
//                    User resultUser = createUser(user);
//                    applicationEventPublisher.publishEvent(new UserCreationEvent(resultUser));
//                    return resultUser;
//                } catch (ConstraintViolationException ex) {
//                    log.error(">>> Constraint violation inserting user: {} - {}", user, ex.getMessage());
//                    transactionManager.rollback(status); // ROLLBACK
//                    throw ex;
//                }
//            }).collect(Collectors.toList());
//
//        transactionManager.commit(status); // COMMIT
//        return created;
//    }

    @TransactionalEventListener
    public void handleUserCreatedTransactionCommit(UserCreationEvent creationEvent) {
        log.info(">>> Transaction COMMIT for user: {}", creationEvent.getUser());
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
    public void handleUserCreatedTransactionRollaback(UserCreationEvent creationEvent) {
        log.info(">>> Transaction ROLLBACK for user: {}", creationEvent.getUser());
    }

}
