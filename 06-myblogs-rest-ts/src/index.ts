import { AppStateStore } from './state-store.js';
import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
import { IdType } from './shared-types.js';


// interface BlogControllerType {
//   postsSection: HTMLElement;
//   erorrsDiv: HTMLElement;
//   addPostForm: HTMLFormElement;
//   resetButton: HTMLButtonElement;
//   init(): Promise<void>;
// }


class BlogsController {
  postsSection = document.getElementById("posts")!;
  erorrsDiv = document.getElementById("errors")!;
  protected addPostForm = document.getElementById("add-post-form")! as HTMLFormElement;
  resetButton = document.getElementById("form-reset-button")! as HTMLButtonElement;

  async init() {
    this.addPostForm.addEventListener('submit', this.handleSubmitPost.bind(this));
    this.resetButton.addEventListener('click', this.resetForm.bind(this));
    try {
      const allPosts = await BlogsAPI.getAllPosts();
      AppStateStore.allPosts = allPosts;
      this.showPosts(allPosts);
    } catch (err) {
      this.showError(err);
    }
  }

  showPosts(posts: Post[]) {
    posts.forEach(post => this.addPostDOM(post));
  }

  showError(err: any) {
    this.erorrsDiv.innerHTML = `<div>${err}</div>`;
  }

  addPostDOM(post: Post) {
    const postElem = document.createElement('article');
    postElem.setAttribute('id', post.id.toString());
    postElem.className = "col s12 m6 l4";
    this.updateArticleInnerHtml(postElem, post);
    this.postsSection.insertAdjacentElement("beforeend", postElem);
  }
  
  updatePostDOM(post: Post) {
    const postElem = document.getElementById(post.id.toString())!;
    this.updateArticleInnerHtml(postElem, post);
  }
  
  private updateArticleInnerHtml(postElem: HTMLElement, post: Post) {
    postElem.innerHTML = `
      <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${post.imageUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
        <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
        <p>${post.content}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light" type="button" id="edit${post.id}">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${post.id}">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;
    postElem.querySelector(`#delete${post.id}`)!.addEventListener('click', event => this.deletePost(post.id))
    postElem.querySelector(`#edit${post.id}`)!.addEventListener('click', event => this.editPost(post))
  }
  
 editPost(post: Post) {
    this.fillPostForm(post);
    window.scrollTo(0, 0);
    AppStateStore.editedPost = post;
  }
  
 fillPostForm(post: Post) {
    // let field: keyof Post;
    for (const field in post) {
      (document.getElementById(field) as HTMLFormElement).value = post[field as keyof Post];
      const label = document.querySelector(`#add-post-form label[for=${field}]`);
      if (label) {
        label.className = 'active';
      }
    }
  }
  
  
async handleSubmitPost(event: SubmitEvent) {
    try {
      event.preventDefault();
      const formData = new FormData(this.addPostForm);
      type PostDict = {
        [key: string]: string
      };
      const np: PostDict = {};
      formData.forEach((value, key) => {
        np[key] = value.toString();
      })
      // const post = newPost as unknown as Post;
      if (np.id) { // update post
        const post = new Post(parseInt(np.id), np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
        const updated = await BlogsAPI.updatePost(post);
        this.updatePostDOM(updated);
        AppStateStore.editedPost = undefined;
      } else { // create post 
        const newPost = new PostCreateDto(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
        const created = await BlogsAPI.addNewPost(newPost);
        this.addPostDOM(created);
      }
      this.resetForm();
    } catch (err) {
      this.showError(err);
    }
  }
  
 resetForm() {
    if (AppStateStore.editedPost) {
      this.fillPostForm(AppStateStore.editedPost);
    } else {
      this.addPostForm.reset();
    }
  }
  
  async deletePost(postId: IdType) {
    try {
      await BlogsAPI.deletePostById(postId);
      document.getElementById(postId.toString())?.remove();
    } catch (err) {
      this.showError(err);
    }
  }
}

const blogsController = new  BlogsController();
class NewBlogsController extends BlogsController {
  print() {
    this.addPostForm
  }
}

blogsController.init();
