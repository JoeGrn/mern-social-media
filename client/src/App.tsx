import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Routes from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Routes />
      </Container>
    </ApolloProvider>
  );
}

export default App;
