import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

import { IContext } from '../../types'

export default {
    Mutation: {
        async createComment(_: any, args: { postId: string, body: string }, context: any) {
            const { postId, body } = args;
            const user: { username: string } = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Comment cannot be empty', {
                    errors: {
                        body: 'Comment cannot be empty',
                    },
                });
            }
            const post: any = await Post.findById(postId);

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
        async deleteComment(_: any, args: { postId: string, commentId: string }, context: any) {
            const { postId, commentId } = args;
            const user: { username: string } = checkAuth(context);

            const post: any = await Post.findById(postId);

            if (post) {
                const commentIndex: any = post.comments.findIndex(
                    (c: any) => c.id === commentId,
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
            } else {
                throw new UserInputError('Post not found');
            }
        },
    },
};
