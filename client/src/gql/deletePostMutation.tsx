import gql from "graphql-tag";

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!) {
        deletePost(postId: $postId)
    }
`;
