
export const BLOG_API_BASE = "http://localhost:8080/api";

class BlogApi {
    token = undefined;

    async findAllPosts() {
        const postsResp = await fetch(
            BLOG_API_BASE + "/posts"
        );
        const postsFound = await postsResp.json();
        console.log(postsFound);
        return postsFound;
    }

    async findPostById(id) {
        const postsResp = await fetch(
            BLOG_API_BASE + "/posts/"+ encodeURIComponent(id)
        );
        const postFound = await postsResp.json();
        console.log(postFound);
        return postFound;
    }

    async createPost(post) {
        const postsResp = await fetch(
            BLOG_API_BASE + "/posts",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            }
        );
        const postCreated = await postsResp.json();
        if(postsResp.status >= 400) { //error status code
            console.log("Error creating Post:", postCreated);
            throw(postCreated.message);
        }
        console.log("POST created successfully", postCreated);
        return postCreated;
    }

    async updatePost(post, history) {
        const postsResp = await fetch(
            BLOG_API_BASE + "/posts/" + encodeURIComponent(post.id),
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(post)
            }
        );
        const postUpdated = await postsResp.json();
        if(postsResp.status >= 400) { //error status code
            console.log("Error updating Post:", postUpdated);
            throw(postUpdated.message);
        }
        console.log("POST updated successfully", postUpdated);
        return postUpdated;
    }

    async deletePostById(id) {
        const deleteResp = await fetch(
            BLOG_API_BASE + "/posts/"+ encodeURIComponent(id),
            {
                method: 'DELETE'
            }
        );
        const deleted = await deleteResp.json();
        if(deleteResp.status >= 400) { //error status code
            console.log("Error deleting Post:", deleted);
            throw(deleted.message);
        }
        console.log("POST deleted successfully", deleted);
        return deleted;
    }

    async findAllUsers() {
        const usersResp = await fetch(
            BLOG_API_BASE + "/users"
        );
        const usersFound = await usersResp.json();
        console.log(usersFound.items);
        return usersFound;
    }

    async findUserById(id) {
        const usersResp = await fetch(
            BLOG_API_BASE + "/users/"+ encodeURIComponent(id)
        );
        const userFound = await usersResp.json();
        console.log(userFound);
        return userFound;
    }

    async register(user) {
        const usersResp = await fetch(
            BLOG_API_BASE + "/auth/register",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        );
        const userCreated = await usersResp.json();
        if(usersResp.status >= 400) { //error status code
            console.log("Error creating Post:", userCreated);
            throw(userCreated.message);
        }
        console.log("USER created successfully", userCreated);
        return userCreated;
    }

    async login(credentials) {
        const userResp = await fetch(
            BLOG_API_BASE + "/auth/login",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            }
        );
        const resp = await userResp.json();
        console.log("USER logged-in successfully:", resp);
        this.token = resp.token;
        return resp;
    }
}

const BlogAPI = new BlogApi();
export default BlogAPI;
