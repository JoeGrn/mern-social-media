import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

import { IContext, ILike, IPost, IUser, ICreatePostArgs, IDeletePostArgs, ILikePostArgs } from '../../interfaces';

export default {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        async getPost(_: any, args: any) {
            const postId: string = args.postId;
            try {
                const post = await Post.findById(postId);
                if (!post) {
                    throw new Error('Post not found');
                }
                return post;
            } catch (e) {
                throw new Error(e.message);
            }
        },
    },
    Mutation: {
        async createPost(_: any, { body }: ICreatePostArgs, context: any) {
            const user: IUser = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Post body cannot be empty');
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post,
            });

            return post;
        },
        async deletePost(_: any, { postId }: IDeletePostArgs, context: IContext) {
            const user: IUser = checkAuth(context);

            try {
                const post: any = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post Deleted';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        async likePost(_: any, { postId }: ILikePostArgs, context: IContext) {
            const user: IUser = checkAuth(context);

            let post: any = await Post.findById(postId);

            if (post) {
                if (post.likes.find((like: ILike) => like.username === user.username)) {
                    post.likes = post.likes.filter(
                        (like: ILike) => like.username !== user.username,
                    );
                    await post.save();
                } else {
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString(),
                    });
                }

                await post.save();

                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        },
    },
    Subscription: {
        newPost: {
            subscribe: (_: any, __: any, context: any) =>
                context.pubsub.asyncIterator('NEW_POST'),
        },
    },
};
