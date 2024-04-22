import React, { useRef } from 'react'

interface Props {
}
interface State {
}

export function UncontrolledFunctionForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        alert(`A name: '${nameRef.current?.value}' with experience: ${experienceRef.current?.value} was sumitted.`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" ref={nameRef} />
            </label>
            <label>
                Experience:
                <input type="text" ref={experienceRef} />
            </label>
            <input type="submit" value="Submit" />
            <input type="buton" onClick={(ev) => {experienceRef.current?.focus()}} value="Focuse Experience" />
        </form>
    );
}
