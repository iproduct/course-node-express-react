export const ALL_STATUSES = 0
export const ACTIVE = 1
export const COMPLETED = 2
export const CANCELED = 3

export const TodoStatus = ['ALL_STATUSES', 'ACTIVE', 'COMPLETED', 'CANCELED'];


export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;
    constructor(text, status = ACTIVE) {
        this.text = text;
        this.status = status;
    }
}