
// import {v4 as uuidv4} from 'uuid';

export type Uuid = string;

export interface IdGenerator<K> {
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
    private static nextId = 0;
    getNextId(): number {
        return ++ NumberIdGenerator.nextId;
    }
}

// export class UuidGenerator implements IdGenerator<Uuid> {
//     getNextId(): Uuid {
//         return uuidv4();
//     }
// }
