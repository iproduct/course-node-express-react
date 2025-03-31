export class NumberIdGenrator {
    constructor(nextId = 0) {
        this.nextId = nextId;
    }
    getNextId() {
        return ++this.nextId;
    }
}
