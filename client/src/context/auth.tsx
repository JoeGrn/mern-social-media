import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

import { IUser, IAuthUser } from '../interfaces';

interface State {
    user: Object | null
}

type Action =
    | { type: 'LOGOUT' }
    | { type: 'LOGIN', payload: { token: string } }

interface DecodedToken {
    user: IUser
    exp: number
}

const initialState: State = { user: null };

if (localStorage.getItem("token")) {
    const token: string | null = localStorage.getItem("token");
    const decodedToken: DecodedToken = jwtDecode(token!);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (data: { token: string }) => { },
    logout: () => { },
});

function authReducer(state: State, action: Action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(data: { token: string }) {
        localStorage.setItem("token", data.token);
        dispatch({
            type: "LOGIN",
            payload: data,
        });
    }

    function logout() {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
