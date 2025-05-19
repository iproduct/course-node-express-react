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
import type { IdType, Indentifiable } from '../shared/shared-types';

export interface Repository<T extends Indentifiable> {
    add(user: T): T;
    edit(user: T): T;
    deleteById(id: IdType): T | undefined;
    findAll(): T[];
    findById(id: IdType): T | undefined;
    getCount(): number;
}

export class MockRepository<T extends Indentifiable> implements Repository<T> {
    static nextId : number;
    private entities = new Map<IdType, T>();
    add(entity: T): T {
        entity.id = this.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    edit(entity: T): T {
        if(!entity.id) {
            throw Error(`Entity ID can not be undefined.`)
        }
        const found = this.findById(entity.id);
        if(!found) {
            throw Error(`Entity ID="${entity.id} does not exist and can not be modified.`)
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType): T | undefined {
        const found = this.findById(id);
        this.entities.delete(id);
        return found;
    }
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): T | undefined {
        return this.entities.get(id);
    }
   
    getCount(): number {
        return this.entities.size;
    }

    // Implementation details
    private getNextId(): IdType {
        if(!MockRepository.nextId) {
            MockRepository.nextId = 0;
        }
        return ++MockRepository.nextId + '';
    }
    
}

export class PostRepository extends MockRepository<Post> {
}
