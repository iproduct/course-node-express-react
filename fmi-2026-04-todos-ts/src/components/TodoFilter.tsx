type Props = {
    filter: string,
    onFilterChange: (newFilter: string) => void
}

function TodoFilter({ filter, onFilterChange }: Props) {
    return (
        <div className="input-group mb-3">
            <input value={filter} onChange={event => onFilterChange(event.target.value)} className="form-control" placeholder="Filter Text" title="Filter Text" />
            <button className="btn btn-danger bi bi-calendar-x-fill" onClick={() => onFilterChange('')}></button>
        </div>
    )
}

export default TodoFilter