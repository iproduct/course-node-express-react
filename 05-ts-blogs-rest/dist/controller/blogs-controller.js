var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BlogsApi } from "../service/blogs-api-client.js";
export class BlogsController {
    constructor() {
        this.postsSection = document.getElementById('posts');
        this.errorsDiv = document.getElementById('errors');
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPosts = yield BlogsApi.getAllPosts();
                console.log(allPosts);
                this.showPostsDOM(allPosts);
            }
            catch (err) {
                this.showErrorDOM(err);
            }
        });
    }
    showPostsDOM(allPosts) {
        allPosts.forEach(post => this.addPostDOM(post));
    }
    addPostDOM(post) {
        const postElem = document.createElement('article');
        postElem.setAttribute('id', post.id.toString());
        postElem.className = 'col s12 m6 l4';
        this.updateArticleInnerHtml(postElem, post);
        this.postsSection.insertAdjacentElement('beforeend', postElem);
    }
    showErrorDOM(error) {
        return;
    }
    updateArticleInnerHtml(postElem, post) {
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
    }
}
//# sourceMappingURL=blogs-controller.js.map