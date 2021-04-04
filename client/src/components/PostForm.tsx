import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../hooks/useForm";
import { FETCH_POSTS_QUERY } from "../gql/fetchPostsQuery";

const PostForm: React.FC = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: "",
    });
    const [error, setError] = useState(null);

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        onError(error: any) {
            setError(error.graphQLErrors[0].message);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Write a Post!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error}
                    />
                    <Button type="submit" color="blue">
                        Submit
          </Button>
                </Form.Field>
            </Form>
        </>
    );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
