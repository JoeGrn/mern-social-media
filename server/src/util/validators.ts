import { IErrors } from '../interfaces'

export const validateRegisterInput = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    const errors: IErrors = {};

    if (username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }
    if (email.trim() === '') {
        errors.email = 'Email cannot be empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Must be a valid email address';
        }
    }
    if (password === '') {
        errors.password = 'Password cannot be empty';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length < 1,
    };
};

export const validateLoginInput = (username: string, password: string) => {
    const errors: IErrors = {};

    if (username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }
    if (password.trim() === '') {
        errors.password = 'Password cannot be empty';
    }

    return {
        errors,
        isValid: Object.keys(errors).length < 1,
    };
};
