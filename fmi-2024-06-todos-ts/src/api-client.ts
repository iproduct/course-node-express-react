import { Identifiable, IdType } from "./shared-types.js";

interface EntityConstructor<V> {
    new (...args:any): V;
    className: string;
}

export class ApiClient {
    constructor(private baseUrl: string) { }
    async findAll<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>): Promise<V[]> {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s`);
    }
    async findById<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>, id: IdType): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s/${id}`);
    }
    async create<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>, entity: Omit<V, 'id'>): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entity)
        });
    }
    async update<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>, entity:V): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entity)
        });
    }
    async deleteById<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>, id: IdType): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s/${id}`, {
            method: 'DELETE',
        });
    }

    private async fetchData<D>(uri: string, options?: RequestInit): Promise<D> {
        const resp = await fetch(uri, options);
        if(resp.status >= 400) {
            throw new Error(await resp.text());
        }
        return resp.json();
    }
}