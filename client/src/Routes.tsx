import React, { useContext } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthContext } from "./context/auth";

const AuthRoute = ({ component: Component, ...wrap }: any) => {
  const { user }: any = useContext(AuthContext);

  return (
    <Route
      {...wrap}
      render={(props: any) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

function Routes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </BrowserRouter>
  );
}

export default Routes;
