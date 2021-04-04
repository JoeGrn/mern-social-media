import React, { useState } from "react";

interface InitialState {
    body?: string
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export const useForm = (callback: () => void, initalState: InitialState = {}) => {
    const [values, setValues] = useState(initalState);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    };
};
