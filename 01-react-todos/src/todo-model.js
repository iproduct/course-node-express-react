export const TodoStatus = [
    'Active', 'Completed', 'Canceled'
]
export const Active = 0;
export const Completed = 1
export const Canceled = 2

export class Todo {
    static nextId = 0;
    constructor(text, status = 'active'){
        this.id = Todo.nextId ++;
        this.text = text;
        this.status = status;
    }
}

export function toIsoDate(date){
    return date.toISOString().split('T')[0];
}