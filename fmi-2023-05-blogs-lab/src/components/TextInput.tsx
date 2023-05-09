import React from 'react'
import { Control, FieldValues, Path, RegisterOptions, FieldError, FieldPath, Merge, Controller, ControllerRenderProps } from 'react-hook-form';

type TextInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>;
    control?: Control<TFieldValues, any>;
    label?: string;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}


function TextInput<TFieldValues extends FieldValues>(
    { name, control, label, rules = {}, disabled = false, error = undefined }
        : TextInputProps<TFieldValues>) {
    label = label || (name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));
    return (
        control ?
            (<Controller
                name={name}
                control={control}
                render={({
                    field,
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                }) => (
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" disabled={disabled} {...field} />
                            <label htmlFor={field.name}>{label}</label>
                            {error && <span className="helper-text" data-error="wrong" data-success="right">{error?.message || ''}</span>}
                        </div>
                    </div>
                )}
                rules={rules}
            />) :
            (<Controller
                name={name}
                render={({
                    field,
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                }) => (
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" disabled={disabled} {...field} />
                            <label htmlFor={field.name}>{label}</label>
                            {error && <span className="helper-text" data-error="wrong" data-success="right">{error?.message || ''}</span>}
                        </div>
                    </div>
                )}
                rules={rules}
            />)
    )
}

export default TextInput;