import postsResolvers from './posts'
import usersResolvers from './users'
import commentsResolvers from './comments'


export = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    }
}