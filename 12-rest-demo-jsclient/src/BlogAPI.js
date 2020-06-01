
export const BLOG_API_BASE = "http://localhost:8080/api";

class BlogApi {

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
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            }
        );
        const postCreated = await postsResp.json();
        console.log("POST created successfully", postCreated);
        return postCreated;
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

    async createUser(user) {
        const usersResp = await fetch(
            BLOG_API_BASE + "/users",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        );
        const userCreated = await usersResp.json();
        console.log("USER created successfully", userCreated);
        return userCreated;
    }

    async login(credentials) {
        const userResp = await fetch(
            BLOG_API_BASE + "/login",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            }
        );
        const jwt = await userResp.json();
        console.log("USER logged-in successfully:", jwt);
        return jwt;
    }
}

const BlogAPI = new BlogApi();
export default BlogAPI;
