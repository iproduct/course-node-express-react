import React from 'react'

type Props = {
    value: string;
    onChange: (text: string) => void
}

const TextInput = ({value, onChange}: Props) => {
    return (
        <div className="row">
            <div className="input-field col s12">
                <input id="title" type="text" className="validate" value={value} 
                    onChange={(e) => onChange(e.target.value)} />
                <label htmlFor="title">Title</label>
                <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
            </div>
        </div>
    )
}

export default TextInput;