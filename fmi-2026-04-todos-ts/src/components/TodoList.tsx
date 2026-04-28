import { useMemo, type ReactNode } from 'react';
import { type Todo } from '../model/todo'
import TodoItem, { type TodoChangeListener } from './TodoItem'

type Props = {
    todos: Todo[];
    filter: string;
    children: ReactNode | ReactNode[];
    changeTodo: TodoChangeListener;
}

function filterTodos(todos: Todo[], filter: string) {
    console.log("Calculating visible todos for:", todos, filter);
    return todos.filter(td => td.text.includes(filter));
}

const TodoList = ({ todos, filter, children, ...rest }: Props) => {
    const visibleTodos = useMemo(
        () => filterTodos(todos, filter),
        [todos, filter]
    );
    return (
        <>
            {children}
            <ul>
                {visibleTodos.map(todo => (<TodoItem key={todo.id} todo={todo} {...rest} />))}
            </ul>
        </>
    )
}

export default TodoList