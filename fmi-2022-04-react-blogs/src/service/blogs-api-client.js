export const BLOGS_API_BASE_URL = 'http://localhost:8080/api';

class BlogsApiClient {
    constructor(baseApiUrl){
        this.baseApiUrl = baseApiUrl;
    }

    async fetchPosts() {
        return this.handleResponse(async ()=> fetch(`${this.baseApiUrl}/posts`))
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