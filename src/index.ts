require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
const mongoose = require('mongoose');

const MONGODB = process.env.CONNECTION_STRING;

console.log(MONGODB)

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello World!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo DB Connected")
    return server.listen({ port: 5000 });
  })
  .then((res: any) => {
    console.log(`Server running at ${res.url}`);
  });
