import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../hooks/useForm";
import { AuthContext } from '../context/auth'

import { IAuthUser } from '../interfaces';

interface IErrors {
    username?: string
    password?: string
}

const Login = (props: any) => {
    const context: IAuthUser = useContext(AuthContext)
    const [errors, setErrors] = useState<IErrors>({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
        update(_, result) {
            context.login(result.data.login)
            props.history.push("/");
        },
        onError(error: any) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    const renderErrors = () => {
        return (
            <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value: any) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
        </Button>
            </Form>
            {Object.keys(errors).length > 0 && renderErrors()}
        </div>
    );
};

const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Login;
