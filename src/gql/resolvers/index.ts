import postsResolvers from './posts'

export = {
    Query: {
        ...postsResolvers.Query
    }
}