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
//# sourceMappingURL=blog-service.js.map