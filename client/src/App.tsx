import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Routes from "./Routes";
import { AuthProvider } from "./context/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:5000"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Container>
          <Routes />
        </Container>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
