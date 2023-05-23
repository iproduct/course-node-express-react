import { Post } from '../model/post';
import { Identifiable, IdType, Repository } from './repository';
import { writeFile,  readFile} from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../model/errors';


export class JsonFileRepository<T extends Identifiable> implements Repository<T> {
    constructor(private dbFile: string) { }

    async create(entity: T): Promise<T> {
        const all = await this.findAll();
        entity.id = uuidv4();
        all.push(entity);
        await this.save(all);
        return entity;
    }
    async update(entity: T): Promise<T> {
        const all = await this.findAll();
        const index = all.findIndex(e => e.id === entity.id)
        all[index] = entity;
        await this.save(all);
        return entity;
    }
    async deleteById(id: string): Promise<T> {
        const entities = await this.findAll();
        const index = entities.findIndex(e => e.id === id)
        if (index < 0) {
            throw new NotFoundError(`Entity with ID = '${id}' not found.`);
        }
        const deleted = entities.splice(index, 1)[0];
        await this.save(entities);
        return deleted;
    }
    async findAll(): Promise<T[]> {
        const entitiesData = await readFile(this.dbFile)
        const entities = JSON.parse(entitiesData.toString());
        return entities;
    }
    async findById(id: IdType): Promise<T> {
        const entities = await this.findAll();
        const result =  entities.find(e => e.id === id);
        if (!result) {
            throw new NotFoundError(`Entity with ID = '${id}' not found.`);
        }
        return result;
    }
    async count(): Promise<number> {
        const posts = await this.findAll();
        return posts.length;
    }
    private async save(entities: T[]) {
        return writeFile(this.dbFile, JSON.stringify(entities));
    }
}
