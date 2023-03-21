var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BlogsAPI } from './blogs-api-client.js';
import { Post, PostCreateDto } from './posts.js';
const postsSection = document.getElementById("posts");
const erorrsDiv = document.getElementById("errors");
const addPostForm = document.getElementById("add-post-form");
const resetButton = document.getElementById("form-reset-button");
addPostForm.addEventListener('submit', handleSubmitPost);
resetButton.addEventListener('click', resetForm);
const APP_STATE = {
    editedPost: undefined,
    allPosts: []
};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPosts = yield BlogsAPI.getAllPosts();
            APP_STATE.allPosts = allPosts;
            showPosts(allPosts);
        }
        catch (err) {
            showError(err);
        }
    });
}
export function showPosts(posts) {
    posts.forEach(post => addPostDOM(post));
}
export function showError(err) {
    erorrsDiv.innerHTML = `<div>${err}</div>`;
}
export function addPostDOM(post) {
    const postElem = document.createElement('article');
    postElem.setAttribute('id', post.id.toString());
    postElem.className = "col s12 m6 l4";
    updateArticleInnerHtml(postElem, post);
    postsSection.insertAdjacentElement("beforeend", postElem);
}
export function updatePostDOM(post) {
    const postElem = document.getElementById(post.id.toString());
    updateArticleInnerHtml(postElem, post);
}
function updateArticleInnerHtml(postElem, post) {
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
    postElem.querySelector(`#delete${post.id}`).addEventListener('click', event => deletePost(post.id));
    postElem.querySelector(`#edit${post.id}`).addEventListener('click', event => editPost(post));
}
function editPost(post) {
    fillPostForm(post);
    window.scrollTo(0, 0);
    APP_STATE.editedPost = post;
}
function fillPostForm(post) {
    let field;
    for (field in post) {
        document.getElementById(field).value = post[field];
        const label = document.querySelector(`#add-post-form label[for=${field}]`);
        if (label) {
            label.className = 'active';
        }
    }
}
function handleSubmitPost(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const formData = new FormData(addPostForm);
            const np = {};
            formData.forEach((value, key) => {
                np[key] = value.toString();
            });
            if (np.id) {
                const post = new Post(parseInt(np.id), np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
                const updated = yield BlogsAPI.updatePost(post);
                updatePostDOM(updated);
                APP_STATE.editedPost = undefined;
            }
            else {
                const newPost = new PostCreateDto(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, parseInt(np.authorId) || 1);
                const created = yield BlogsAPI.addNewPost(newPost);
                addPostDOM(created);
            }
            resetForm();
        }
        catch (err) {
            showError(err);
        }
    });
}
export function resetForm() {
    if (APP_STATE.editedPost) {
        fillPostForm(APP_STATE.editedPost);
    }
    else {
        addPostForm.reset();
    }
}
export function deletePost(postId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield BlogsAPI.deletePostById(postId);
            (_a = document.getElementById(postId.toString())) === null || _a === void 0 ? void 0 : _a.remove();
        }
        catch (err) {
            showError(err);
        }
    });
}
init();
//# sourceMappingURL=index%20copy.js.map