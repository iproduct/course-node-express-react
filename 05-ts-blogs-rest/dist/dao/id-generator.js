export class NumberIdGenerator {
    getNextId() {
        return ++NumberIdGenerator.nextId;
    }
}
NumberIdGenerator.nextId = 0;
//# sourceMappingURL=id-generator.js.map