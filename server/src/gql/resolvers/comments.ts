import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

import {
    IContext,
    IComment,
    ICreateCommentArgs,
    IDeleteCommentArgs,
    IPost
} from '../../interfaces'

export default {
    Mutation: {
        async createComment(_: any, args: ICreateCommentArgs, context: IContext): Promise<IPost> {
            const { postId, body } = args;
            const user: { username: string } = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Comment cannot be empty', {
                    errors: {
                        body: 'Comment cannot be empty',
                    },
                });
            }
            const post: IPost | null = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                });
                await post.save();

                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        },
        async deleteComment(_: any, args: IDeleteCommentArgs, context: IContext): Promise<IPost | Error> {
            const { postId, commentId } = args;

            const user: { username: string } = checkAuth(context);
            const post: IPost | null = await Post.findById(postId);

            if (!post) {
                return new UserInputError('Post not found')
            }

            const commentIndex: number = post.comments.findIndex(
                (c: IComment) => c.id === commentId,
            );

            if (commentIndex === -1)
                throw new AuthenticationError('Action not allowed');

            if (post.comments[commentIndex].username === user.username) {
                post.comments.splice(commentIndex, 1);
                await post.save();

                return post;
            } else {
                throw new AuthenticationError('Action not allowed');
            }
        },
    },
};
