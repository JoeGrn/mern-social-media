import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';

import { DB_STRING, PORT } from './constants';
import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
});

mongoose
    .connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB Connected');
        return server.listen(PORT);
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });
