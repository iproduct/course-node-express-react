import { IdType } from "./shared-types";

export enum TodoStatus{
    Active = 1, Completed, Canceled
}

export class TodoCreateDto {
    constructor(public text: string, public status: TodoStatus =TodoStatus.Active) {}
}

export class Todo extends TodoCreateDto{
    static className = 'Todo';
    public id: IdType = 0;

}