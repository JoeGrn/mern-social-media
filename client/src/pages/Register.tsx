import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { AuthContext } from '../context/auth';

import { IAuthUser } from '../interfaces';

interface Props extends RouteComponentProps {
}

const Register: React.FC<Props> = ({ history }) => {
    const context = useContext(AuthContext)
    const [errors, setErrors]: any = useState({});

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
        update(_, result) {
            context.login(result.data.register)
            history.push("/");
        },
        onError(error: any) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUserCallback() {
        addUser();
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
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    value={values.email}
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
                <Form.Input
                    label="ConfirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
        </Button>
            </Form>
            {Object.keys(errors).length > 0 && renderErrors()}
        </div>
    );
};

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Register;
