import { IdType, Identifiable } from "../common-types";

export const BASE_API_URL = 'http://localhost:9000/api';

export interface BlogsApi<T extends Identifiable> {
    findAll():  Promise<T[]>;
    findById(id: IdType): Promise<T>;
    create(entity: Omit<T, 'id'>): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<T>;
}

export class BlogsApiClient<T extends Identifiable> implements BlogsApi<T>{
    constructor(private collection: string) {}
    findAll(): Promise<T[]> {
        return this.handleRequest<T[]>(`${BASE_API_URL}/${this.collection}`);
    }
    findById(id: IdType): Promise<T> {
        return this.handleRequest<T>(`${BASE_API_URL}/${this.collection}/${id}`);
    }
    create(entity: Omit<T, "id">): Promise<T> {
        return this.handleRequest<T>(`${BASE_API_URL}/${this.collection}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    update(entity: T): Promise<T> {
        return this.handleRequest<T>(`${BASE_API_URL}/${this.collection}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    deleteById(id: number): Promise<T> {
        return this.handleRequest<T>(`${BASE_API_URL}/${this.collection}/${id}`, {
            method: 'DELETE'
        });
    }
    

    private async handleRequest<D>(url: string, options?: RequestInit) {
        try {
            const resp = await fetch(url, options);
            const data = await resp.json;
            if(resp.status >= 400) {
                return Promise.reject(data);
            }
            return data as D;
        } catch(err) {
            return Promise.reject(err);
        }
    }
}