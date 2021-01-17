import React, { createContext, useReducer } from "react";

const AuthContext: any = createContext({
  user: null,
  login: (data: any) => {},
  logout: () => {},
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
  const initialState: any = { user: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(data: any) {
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  }

  function logout() {
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
