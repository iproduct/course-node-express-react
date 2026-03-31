import { IdGenerator } from "../id-generator";

export class IdGeneratorNumber implements IdGenerator<number> {
    constructor(private value: number) {}
    getNextId(): number {
        return ++this.value;
    }
}