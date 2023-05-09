import React from 'react'

type Props = {
    name: string,
    value: string;
    onChange: (text: string) => void
}

const TextInput = ({name, value, onChange}: Props) => {
    const fieldId = name.toLowerCase();
    return (
        <div className="row">
            <div className="input-field col s12">
                <input id={fieldId} type="text" className="validate" value={value} 
                    onChange={(e) => onChange(e.target.value)} />
                <label htmlFor={fieldId}>{name}</label>
                <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
            </div>
        </div>
    )
}

export default TextInput;