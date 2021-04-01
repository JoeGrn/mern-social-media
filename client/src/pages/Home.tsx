import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import "../App.css";

import { AuthContext } from "../context/auth";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../gql/fetchPostsQuery";

import { IPost } from '../interfaces'

const Home = (): JSX.Element => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  const posts: Array<IPost> = data && data.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
            <Transition.Group>
            {posts &&
              posts.map((post: IPost) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <Post post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
