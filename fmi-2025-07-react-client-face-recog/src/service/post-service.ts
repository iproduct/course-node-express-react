/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Post } from '../model/post.model';
import type { IdType } from '../shared/shared-types';
import { handleErrorStausCodes } from './service-utils';

export const API_BASE = 'http://localhost:8080/api';

class PostService {
    constructor(private apiUrl: string) {}

    async getAllPosts() {
        const resp = await fetch(`${this.apiUrl}/posts`);
        return handleErrorStausCodes<Post[]>(resp);
    }

    async getPostById(postId: IdType) {
        const resp = await fetch(`${this.apiUrl}/posts/${postId}`);
        return handleErrorStausCodes<Post>(resp);
    }

    async createNewPost(post: Post, authToken: string | undefined) {
        const resp = await fetch(`${this.apiUrl}/posts`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        },
            body: JSON.stringify(post),
        });
        return handleErrorStausCodes<Post>(resp);
    }

    async updatePost(post: Post) {
        const resp = await fetch(`${this.apiUrl}/posts/${post.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post),
        });
        return handleErrorStausCodes<Post>(resp);
    }

    async deletePost(postId: IdType) {
        const resp = await fetch(`${this.apiUrl}/posts/${postId}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        return handleErrorStausCodes<Post>(resp);
    }

}



export default new PostService(API_BASE);
