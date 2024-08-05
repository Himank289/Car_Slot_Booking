import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
import { getUser, signup } from "../Services/UserService";

import "./SignupPage.css";
import React from "react";

const schema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    role: z.string(),
  })

  type FormData = z.infer<typeof schema>;

const SignupPage:React.FC = () => {
  const [formError, setFormError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit : SubmitHandler<FormData>= async (formData:FormData) => {
    try {
      await signup(formData);
      window.location.href = "/";
    } catch (err:any) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to='/' />;
  }

  return (
    <section className='align_center form_page'>
      <form
        className='authentication_form signup_form'
        onSubmit={handleSubmit(onSubmit)}
        >
        <h2>SignUp </h2>


    
        <div className='form_inputs signup_form_input'>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              className='form_text_input'
              type='text'
              placeholder='Enter your name'
              {...register("name", { required: true })}
            />
            {errors.name && (
              <em className='form_error'>{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className='form_text_input'
              type='email'
              placeholder='Enter your email address'
              {...register("email", { required: true })}
            />
            {errors.email && (
              <em className='form_error'>{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              className='form_text_input'
              type='password'
              placeholder='Enter your password'
              {...register("password", { required: true })}
            />
            {errors.password && (
              <em className='form_error'>{errors.password.message}</em>
            )}
          </div>


          <div>
            <label htmlFor='role'>Role</label>
            <select
              id='role'
              className='form_text_input'
              {...register("role")}
            >
              <option value=''>Select Role</option>
              <option value='user'>User</option>
              {/* <option value='admin'>Admin</option> */}
            </select>
          </div>
        </div>

        {formError && <em className='form_error'>{formError}</em>}

        <button className='search_button form_submit' type='submit'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
