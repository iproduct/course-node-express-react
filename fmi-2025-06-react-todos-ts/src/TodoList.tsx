import React from 'react'

type Props = {
    todos: []
}

const TodoList = (props: Props) => {
    return (
        <>
            <div>TodoList</div>
            <div>{props ? 'Todos here ...' : 'No todos yet.'}</div>
        </>
    )
}

export default TodoList