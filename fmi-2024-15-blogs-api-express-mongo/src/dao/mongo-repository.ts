import { Document, OptionalId } from 'mongodb';
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
import { Indentifiable, IdType, ResourceType } from '../model/shared-types';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { Repository } from './repository';
import { AppError } from '../model/errors';
import { User } from '../model/user.model';


export class MongoRepository<T extends Indentifiable> implements Repository<T> {
    constructor(public entytyType: ResourceType<T>, public db: Db, public collection: string) { }

    async add(entity: T) {
        const {id, ...document} = entity;

        const res = await this.db.collection(this.collection).insertOne(document);
        if (res.acknowledged) {
            entity.id = res.insertedId.toString();
            console.log(`Created new ${this.entytyType.typeId}: ${JSON.stringify(entity)}`);
            return entity;
        }
        throw new AppError(500, `Error inserting ${this.entytyType.typeId}: "${JSON.stringify(entity)}"`);
    }
    async edit(entity: T): Promise<T> {
        if (!entity.id) {
            throw new AppError(400, `${this.entytyType.typeId} ID can not be undefined.`)
        }
        const {id, ...document} = entity;
        (document as Document)._id = id;
        const found =  await this.findById(entity.id);
        if (!found) {
            throw new AppError(404, `${this.entytyType.typeId} ID="${entity.id} does not exist and can not be modified.`);
        }
        // update by _id
        var myquery = { _id: new ObjectId(entity.id) };
        var newvalues = { $set: document };
        const updateRes = await this.db.collection(this.collection)
            .updateOne(myquery, newvalues);
        // console.log(updateRes);
        if (updateRes.acknowledged && updateRes.upsertedCount === 1) {
            console.log(`${this.entytyType.typeId} successfully updated: ${JSON.stringify(entity)}`);
            return entity;
        }
        throw new AppError(500, `Error inserting ${this.entytyType.typeId}: "${JSON.stringify(entity)}"`);
    }
    async deleteById(id: IdType): Promise<T> {
        const found=await this.findById(id);
        if (!found) {
            throw new AppError(404, `${this.entytyType.typeId} ID="${id} does not exist and can not be modified.`);
        }
        const res = await this.db.collection(this.collection).deleteOne({_id: new ObjectId(id)});
        if (res.acknowledged && res.deletedCount === 1) {
            console.log(`Deleted ${this.entytyType.typeId}: ${JSON.stringify(found)}`);
            return found;
        }
        throw new AppError(500, `Error inserting ${this.entytyType.typeId}: "${JSON.stringify(found)}"`);
    }
    async findAll(): Promise<T[]> {
        return this.db.collection(this.collection).find().toArray() as unknown as Promise<T[]>;
    }
    async findById(id: IdType): Promise<T> {
        try {
            const {_id, ...props} = await this.db.collection(this.collection).findOne({_id: new ObjectId(id)});
            return {id: _id, ...props} as unknown as Promise<T>;
        } catch(err) {
            throw new AppError(404, err.message);
        }
    }

    async getCount(): Promise<number> {
        return this.db.collection(this.collection).countDocuments();
    }
}


export class PostRepository extends MongoRepository<Post> {
}

export class UserRepository extends MongoRepository<User> {
    async findByUsername(username: string): Promise<User> {
        try {
            const {_id, ...props} = await this.db.collection(this.collection).findOne({'username': username});
            return {id: _id, ...props} as unknown as Promise<User>;
        } catch(err) {
            throw new AppError(404, `User with username: "${username}" does not exist.`);
        }
    }
}

