type IdType = number

export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    constructor(
        public id: IdType,
        public text: string,
        public status: TodoStatus = TodoStatus.Active
    ) {}
}