import postsResolvers from './posts';
import usersResolvers from './users';
import commentsResolvers from './comments';

import { ILike, IComment } from '../../interfaces';

export = {
    Post: {
        likeCount: (parent: { likes: Array<ILike> }) => parent.likes.length,
        commentCount: (parent: { comments: Array<IComment> }) => parent.comments.length,
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    }
};
