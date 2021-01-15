import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Routes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </BrowserRouter>
  );
}

export default Routes;
