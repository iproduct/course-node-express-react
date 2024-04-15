import { ChangeEvent } from 'react'
import { TodoStatus } from './todo-model'

type Props = {
    filter: TodoStatus,
    onFilterChange: (status: TodoStatus) => void
}

const TodoFilter = ({ filter, onFilterChange }: Props) => {
    function changeFilter(event: ChangeEvent<HTMLSelectElement>) {
        onFilterChange(parseInt(event.target.value))
    }

    return (
        <select value={filter} onChange={changeFilter} className="form-select">
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
            <option value={TodoStatus.Canceled}>Canceled</option>
        </select>
    )
}

export default TodoFilter