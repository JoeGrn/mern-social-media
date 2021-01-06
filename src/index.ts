import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';

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

server.listen({ port: 5000 }).then((res: any) => {
  console.log(`Server running at ${res.url}`);
});
