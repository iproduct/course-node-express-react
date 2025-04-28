import React, {useRef} from 'react';


export function UncontrolledForm() {
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
            <input type="buton" onClick={() => {experienceRef.current?.focus()}} value="Focuse Experience" />
        </form>
    );
}


export default UncontrolledForm