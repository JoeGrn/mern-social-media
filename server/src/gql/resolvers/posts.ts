import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

import {
    IContext,
    ILike,
    IPost,
    IUser,
    ICreatePostArgs,
    IDeletePostArgs,
    ILikePostArgs,
    IGetPostArgs
} from '../../interfaces';

export default {
    Query: {
        async getPosts(): Promise<Array<IPost>> {
            try {
                const posts: Array<IPost> = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        async getPost(_: any, args: IGetPostArgs) {
            const { postId } = args;
            try {
                const post: IPost | null = await Post.findById(postId);
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
        async createPost(_: any, args: ICreatePostArgs, context: IContext): Promise<IPost> {
            const { body } = args;
            const user: IUser = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Post body cannot be empty');
            }

            const newPost: IPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            const post: IPost = await newPost.save();

            return post;
        },
        async deletePost(_: any, args: IDeletePostArgs, context: IContext): Promise<string>{
            const { postId } = args;

            const user: IUser = checkAuth(context);

            try {
                const post: IPost | null = await Post.findById(postId);

                if (!post) {
                    new UserInputError('Post not found')
                }

                if (user.username === post?.username) {
                    await post.delete();
                    return 'Post Deleted';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (e) {
                throw new Error(e.message);
            }
        },
        async likePost(_: any, args: ILikePostArgs, context: IContext): Promise<IPost> {
            const { postId } = args

            const user: IUser = checkAuth(context);
            const post: IPost | null = await Post.findById(postId);

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
    }
};
