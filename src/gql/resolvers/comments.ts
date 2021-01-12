import { UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

export default {
  Mutation: {
    async createComment(parent: any, args: any, context: any) {
      const { postId, body } = args.commentInput
      const user: any = checkAuth(context);

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
          createAt: new Date().toISOString(),
        });
        await post.save();

        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};
