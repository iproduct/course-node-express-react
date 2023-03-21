var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_BASE_URL = "http://localhost:4000/api/posts";
class BlogApiClientImpl {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(API_BASE_URL);
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${id}`);
        });
    }
    addNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(post)
            });
        });
    }
    updatePost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${post.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(post)
            });
        });
    }
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
        });
    }
    handleRequest(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsResp = yield fetch(url, options);
                if (postsResp.status >= 400) {
                    return Promise.reject(postsResp.body);
                }
                return postsResp.json();
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
export const BlogsAPI = new BlogApiClientImpl();
//# sourceMappingURL=blogs-api-client.js.map