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
    async create<V extends Identifiable<IdType>>(ctor: EntityConstructor<V>, entity: Omit<V, 'id'>) {
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entity)
        });
    }
    // async update(entity: V) {
    //     await this.findById(entity.id);
    //     this.entities.set(entity.id, entity);
    //     return entity;
    // }
    // async deleteById(id: K) {
    //     const exisitng = await this.findById(id);
    //     this.entities.delete(id);
    //     return exisitng;
    // }
    // get size() {
    //     return Promise.resolve(this.entities.size);
    // }

    private async fetchData<D>(uri: string, options?: RequestInit): Promise<D> {
        const resp = await fetch(uri, options);
        if(resp.status >= 400) {
            throw new Error(await resp.text());
        }
        return resp.json();
    }
}