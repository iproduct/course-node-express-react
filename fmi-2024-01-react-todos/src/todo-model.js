class Todo {
    static nextId = 0;
    constructor(text, status='active') {
        this.id = ++Todo.nextId;
        this.text = text;
        this.status = status;
    }
}