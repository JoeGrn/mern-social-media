import Post from '../../models/Post';
import checkAuth from '../../util/checkAuth';

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

      return post;
    },
  },
};
