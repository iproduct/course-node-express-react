import { IdType } from './../shared-types.js';
import { Post, PostCreateDto } from '../model/posts.js';

const BASE_API_URL = 'http://localhost:4000/api/posts';

export interface BlogsApiClient {
    getAllPosts(): Promise<Post[]>;
    getPostById(id: IdType): Promise<Post>;
    addNewPost(post: PostCreateDto): Promise<Post>;
    updatePost(post: Post): Promise<Post>;
    deletePostById(id: IdType): Promise<Post>;
}

class BlogsApiClientImpl implements BlogsApiClient {
    async getAllPosts(): Promise<Post[]> {
        return this.handleRequest(BASE_API_URL);
    }
    async getPostById(id: number): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${id}`);
    }
    async addNewPost(post: PostCreateDto): Promise<Post> {
        return this.handleRequest(BASE_API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }
    async updatePost(post: Post): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${post.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }
    async deletePostById(id: number): Promise<Post> {
        return this.handleRequest(`${BASE_API_URL}/${id}`, {
            method: 'DELETE',
        });
    }

    private async handleRequest(url: string, options?: RequestInit){
        try {
            const postsResp = await fetch(url, options);
            if(postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch(err) {
            return Promise.reject(err)
        }
    }
}

export const BlogsApi: BlogsApiClient = new BlogsApiClientImpl();