import type { IdType } from "../shared/common-types";

export class Todo {
    static nextId = 0;
    static className = 'todo';
    public id: IdType = ++Todo.nextId;
    constructor(
        public text: string,
        public status: TodoStatus = TodoStatus.ACTIVE
    ) { }
}

export enum TodoStatus {
    ACTIVE = 1, COMPLETED, CANCELED
}