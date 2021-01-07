import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import Post from './models/Post';
import { MONGO_CONNECTION_STRING } from './constants';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo DB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res: any) => {
    console.log(`Server running at ${res.url}`);
  });