import React, { ComponentPropsWithRef, ElementType, FC, PropsWithRef, useRef } from 'react'

export const UncontrolledFormLambda: FC<ComponentPropsWithRef<ElementType<any>>> = () => {
// export const UncontrolledFormLambda = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    const oldName = useRef<string | undefined>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = nameRef.current?.value;
        alert(`A name: ${name}, Age: ${ageRef.current?.value},  Name Changed: ${name !== oldName.current }`);
        oldName.current = name;
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" ref={nameRef} />
            </label><br />
            <label>Age:
                <input type="number" min="0" ref={ageRef} />
            </label>
            <input type='submit' value='Submit' />
            <input type='button' value='Focus Age Field' onClick={() => { ageRef.current?.focus()}} />
        </form>
    );
}
