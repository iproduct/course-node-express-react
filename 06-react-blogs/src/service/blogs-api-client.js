
export const BLOGS_API_BASE_URL = 'http://localhost:8080/api';

class BlogsApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }

    async fetchPosts() {
        return this.handleResponse(async () => fetch(BLOGS_API_BASE_URL + '/posts'));
    }

    async fetchPostById(postId) {
        return this.handleResponse(async () => fetch(`${BLOGS_API_BASE_URL}/posts/${postId}`));
    }

    async postNewPost(post) {
        return this.handleResponse(async () => fetch(BLOGS_API_BASE_URL + '/posts',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        }));
    }

    async editPost(post) {
        return this.handleResponse(async () => fetch(`${BLOGS_API_BASE_URL}/posts/${post.id}`,{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(post)
        }));
    }

    
    async deletePostById(postId) {
        return this.handleResponse(async () => fetch(`${BLOGS_API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
        }));
    }

    // Users API client
    async fetchUsers() {
        return this.handleResponse(async () => fetch(BLOGS_API_BASE_URL + '/users'));
    }

    async postNewUser(post) {
        return this.handleResponse(async () => fetch(BLOGS_API_BASE_URL + '/users',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        }));
    }
    
    async deleteUserById(userId) {
        return this.handleResponse(async () => fetch(`${BLOGS_API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        }));
    }
    
    // Error handling utils
    async handleResponse(asyncRequestFunc){
        try {
            const resp = await asyncRequestFunc();
            const content = await resp.json();
            if( resp.status < 400) {
                console.log(`Content fetched: ${JSON.stringify(content)}`);
                return content;
            } else {
                console.log(`HTTP Error ${resp.status}: ${JSON.stringify(resp)}\n${JSON.stringify(content)}`);
                return Promise.reject(`Error performing HTTP request: ${resp.status}: ${JSON.stringify(resp)}`);
            }
        } catch(err){
            console.log(`HTTP Error performing request: ${err}`);
            return Promise.reject(`Error performing HTTP request: ${err}`);
        }
    }  
}

export default new BlogsApiClient(BLOGS_API_BASE_URL);