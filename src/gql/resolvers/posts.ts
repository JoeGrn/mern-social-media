import { AuthenticationError, UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

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
    async getPost(parent: any, args: any) {
      const postId: String = args.postId;
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
    async createPost(parent: any, args: any, context: any) {
      const user: any = checkAuth(context);
      const body: any = args.body;

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post
      })

      return post;
    },
    async deletePost(parent: any, args: any, context: any) {
      const user: any = checkAuth(context);
      const postId: any = args.postId;

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
    async likePost(parent: any, args: any, context: any) {
      const user: any = checkAuth(context);
      const postId: any = args.postId;

      let post: any = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like: any) => like.username === user.username)) {
          post.likes = post.likes.filter(
            (like: any) => like.username !== user.username,
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
      subscribe: (parent: any, args: any, pubsub: any) => pubsub.pubsub.asyncIterator('NEW_POST')
    }
  }
};
