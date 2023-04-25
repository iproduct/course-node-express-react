import TextField from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface SelectOption {
    key: number;
    value: string;
}


interface FormInputSelectProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any>;
    label: string;
    options: SelectOption[];
    defaultOptionIndex?: number;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    size?: 'small' | 'medium';
    error?: string | undefined;
}


function FormInputSelect<TFieldValues extends FieldValues>(
    { name, control, label, options = [], defaultOptionIndex = 0, rules = {}, disabled = false, size = 'medium', error = undefined }
        : FormInputSelectProps<TFieldValues>) {
    return (
        (
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                (<FormControl>
                    <InputLabel id={name + '-label'}>{label}</InputLabel>
                    <Select
                        labelId={name + '-label'}
                        id={name}
                        label={label}
                        defaultValue={options[defaultOptionIndex].key}
                        {...field}
                    >
                        {options.map((option, index) =>
                            (<MenuItem key={option.key} value={option.key} selected={index === defaultOptionIndex}>
                                {option.value}
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>)
                }
                rules={rules}
            />
        )
    )
}

export default FormInputSelect