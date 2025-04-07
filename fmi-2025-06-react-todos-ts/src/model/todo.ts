export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;
    constructor(
        public text: string,
        public status: TodoStatus = TodoStatus.ACTIVE
    ){console.log(`!!! Todo ${this.id}`)}
}

export enum TodoStatus {
    ACTIVE = 1, COMPLETED
}