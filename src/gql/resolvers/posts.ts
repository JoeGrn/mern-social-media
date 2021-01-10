import Post from '../../models/Post';

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        console.log(e.message);
      }
    },
    async getPost(parent: any, args: any) {
      const postId: String = args.postId
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      } catch (e) {
        throw new Error(e.message)
      }
    },
  },
};
