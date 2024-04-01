import { IdType } from "./shared-types";

enum TodoStatus{
    Created = 1, 
}

export class TodoCreateDTO {
    constructor(public text: string, status ='active') {}
}

export interface Todo extends TodoCreateDTO{
    id: IdType;
}