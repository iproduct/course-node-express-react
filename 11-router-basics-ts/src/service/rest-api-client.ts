import { Post } from "../model/posts";
import { Identifiable, IdType } from "../model/shared-types";

const API_BASE_URL="http://localhost:4000/api";

export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entity: V): Promise<V>;
    patchById(id: K, patch: Partial<V>): Promise<V>;
    deleteById(id: K): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) {}

    findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
    }
    findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`);
    }
    create(entityWithoutId: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entityWithoutId)
        });
    }
    update(entity: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    patchById(id: K, patch: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(patch)
        });
    }
    deleteById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE'
        });
    }

    protected async handleRequest(url: string, options?: RequestInit) {
        try {
            const resp = await fetch(url, options);
            if(resp.status >= 400) {
                return Promise.reject(resp.body);
            }
            return resp.json();
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

export interface PostsApiClient extends ApiClient<IdType, Post>{
    findByTitleLike(title: string): Promise<Post[]>;
}

export class PostsApiClientImpl extends ApiClientImpl<IdType, Post> implements PostsApiClient {
    constructor() {
        super('posts')
    }
    findByTitleLike(search: string): Promise<Post[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}?title_like=${encodeURIComponent(search)}`);
    }
}

export const PostsApi: PostsApiClient = new PostsApiClientImpl();