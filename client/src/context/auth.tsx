import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

import { IUser } from '../interfaces';

interface InitialState {
    user: Object | null
}

interface DecodedToken {
    user: IUser
    exp: number
}

const initialState: InitialState = { user: null };

if (localStorage.getItem("token")) {
    const token: string | null = localStorage.getItem("token");
    const decodedToken: DecodedToken = jwtDecode(token!);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext: any = createContext({
    user: null,
    login: (data: any) => { },
    logout: () => { },
});

function authReducer(state: any, action: any) {
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

    function login(data: any) {
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
