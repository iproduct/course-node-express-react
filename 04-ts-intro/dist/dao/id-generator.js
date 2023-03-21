// import {v4 as uuidv4} from 'uuid';
export class NumberIdGenerator {
    getNextId() {
        return ++NumberIdGenerator.nextId;
    }
}
NumberIdGenerator.nextId = 0;
// export class UuidGenerator implements IdGenerator<Uuid> {
//     getNextId(): Uuid {
//         return uuidv4();
//     }
// }
//# sourceMappingURL=id-generator.js.map