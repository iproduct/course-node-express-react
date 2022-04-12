export const BLOGS_API_BASE_URL = 'http://localhost:8080/api';

class BlogsApiClient {
    constructor(baseApiUrl){
        this.baseApiUrl = baseApiUrl;
    }

    async fetchPosts() {
        return this.handleResponse(async ()=> fetch(`${this.baseApiUrl}/posts`))
    }

    async fetchPostById(postId) {
        return this.handleResponse(async () => fetch(`${this.baseApiUrl}/posts/${postId}`));
    }

    async postNewPost(post) {
        return this.handleResponse(async () => fetch(`${this.baseApiUrl}/posts`,{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        }));
    }

    async editPost(post) {
        return this.handleResponse(async () => fetch(`${this.baseApiUrl}/posts/${post.id}`,{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(post)
        }));
    }

    
    async deletePostById(postId) {
        return this.handleResponse(async () => fetch(`${this.baseApiUrl}/posts/${postId}`, {
            method: 'DELETE',
        }));
    }

    // error handling utils
    async handleResponse(asyncRequestFunc){
        try{
            const resp = await asyncRequestFunc();
            const content = await resp.json();
            if(resp.status < 400) {
                console.log(`Content fetched [${resp.status}]: ${JSON.stringify(content)}`);
                return content;
            } else {
                console.log(`HTTP error ${resp.status}: ${JSON.stringify(resp)}`);
                return Promise.reject(`HTTP error ${resp.status}: ${JSON.stringify(resp)}`);
            }
        } catch(err) {
            console.log(`HTTP error performing request: ${err}`);
            return Promise.reject(`HTTP error performing request: ${err}`);
        }
    }
}

export default new BlogsApiClient(BLOGS_API_BASE_URL);