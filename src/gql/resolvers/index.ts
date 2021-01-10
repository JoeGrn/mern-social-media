import postsResolvers from './posts'
import usersResolvers from './users'

export = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
    }
}