import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./LoginPage.css";
import { getUser, login } from "../Services/UserService"
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
    email: z
        .string()
        .email({ message: "Please enter valid email address." })
        .min(3),
    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters." }),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
    const [formError, setFormError] = useState<string>("");
    const location = useLocation();
    console.log("Login location", location);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });


    const onSubmit = async (formData:FormData) => {
        try {
            await login(formData);

            const { state } = location;
            window.location = state ? state.from : "/";
        } catch (err:any) {
            if (err.response && err.response.status === 404) {
                setFormError("Invalid username or password");
            } else {
                setFormError("An unexpected error occurred. Please try again.");
            }
        }
    };

    if (getUser()) {
        return <Navigate to='/' />;
    }

    return (
        <section className='align_center form_page'>
            <form
                className='authentication_form'
                onSubmit={handleSubmit(onSubmit)}>
                <h2>Login </h2>
                <div className='form_inputs'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='form_text_input'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && (
                            <em className='form_error'>
                                {errors.email.message}
                            </em>
                        )}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            className='form_text_input'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && (
                            <em className='form_error'>
                                {errors.password.message}
                            </em>
                        )}
                    </div>

                    {formError && <em className='form_error'>{formError}</em>}

                    <button type='submit' className='search_button form_submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;