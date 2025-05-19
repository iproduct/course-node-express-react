import { IdType } from "../common/common-types";

export class Todo {
    static className = 'Todo';
    constructor(
        public id: IdType,
        public text: string,
        public status: TodoStatus = TodoStatus.ACTIVE
    ){}
}

export enum TodoStatus {
    ACTIVE = 1, COMPLETED
}