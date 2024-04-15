import { ChangeEvent } from 'react'
import { TodoStatus } from './todo-model'

export type TodoFilterType = TodoStatus | undefined;

type Props = {
    filter: TodoFilterType ,
    onFilterChange: (status: TodoFilterType) => void
}

const TodoFilter = ({ filter, onFilterChange }: Props) => {
    function changeFilter(event: ChangeEvent<HTMLSelectElement>) {
        onFilterChange(parseInt(event.target.value))
    }

    return (
        <select value={filter} onChange={changeFilter} className="form-select">
            <option value={undefined}>All</option>
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
            <option value={TodoStatus.Canceled}>Canceled</option>
        </select>
    )
}

export default TodoFilter