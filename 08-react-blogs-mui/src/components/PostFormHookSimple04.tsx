import * as React from "react";
import { Resolver, useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
};


const resolver: Resolver<FormData> = async(values) => {
  return {
    values: values.firstName ? values: {},
    errors: !values.firstName || values.firstName.length < 3 ? {
      firstName: {
        type: !values.firstName? 'required': 'minLength',
        message: !values.firstName ? 'First Name is required!': 'First Name should be atleast 3 characters!'
      }
    }: {}
  };
}

export default function PostFormHookSimple() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
    resolver
  });
  const onSubmit = handleSubmit(data => console.log(data));
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")}/>
      {errors.firstName && <div className="error">{errors.firstName.message}</div>}

      <label>Last Name</label>
      <input {...register("lastName")} />
      {errors.lastName && <div className="error">{errors.lastName.message}</div>}

      <label>Age</label>
      <input {...register("age", {
        valueAsNumber: true,
        required: "First name is required field.",
        max: { value: 120, message: "Age should less than 120." },
        validate: {
          positive: v => v < 0 ? "Should be positive number": true ,
          // lessThanTen: v => parseInt(v) < 10,
          // checkAge: async (v) => {
          //   try{
          //   return await new Promise<string|boolean>((res, rej) => setTimeout((val)=> val===42 ? rej("Invalid Age."): res(true), 2000, v))
          //   } catch(err) {
          //     return err as string;
          //   }
          // },
        }
      })} />
      {errors.age && <div className="error">{errors.age.message}</div>}
      <button type="submit">
        Submit
      </button>
      <button type="button" onClick={() => {
        setValue("lastName", "Petrov");
        setValue("firstName", "Ivan");
        setValue("age", 25);
      }}
      >
        SetValue
      </button>
    </form>
  );
}