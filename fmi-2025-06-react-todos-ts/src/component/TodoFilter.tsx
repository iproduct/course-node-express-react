import{ ChangeEvent } from 'react'
import { TodoStatus } from '../model/todo'

export type TodoFilterType = TodoStatus | undefined;

type Props = {
    filter: TodoFilterType,
    onFilterChange: (status: TodoFilterType) => void
}

const TodoFilter = ({ filter, onFilterChange }: Props) => {
    function changeFilter(event: ChangeEvent<HTMLSelectElement>) {
        onFilterChange(parseInt(event.target.value))
    }
    return (
        <select value={filter} onChange={changeFilter}>
            <option value={undefined}>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
        </select>
    );
}

export default TodoFilter