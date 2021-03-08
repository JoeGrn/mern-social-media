import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../gql/fetchPostsQuery';

interface PropTypes {
    postId?: string
    commentId?: string
    callback?: any
}

const DeleteButton = ({ postId, commentId, callback }: PropTypes): JSX.Element => {
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteMutation] = useMutation(mutation, {
        update(cache) {
            setConfirmOpen(false)
            const data: any = cache.readQuery({
                query: FETCH_POSTS_QUERY
            })
            const postToDelete = data.getPosts.filter((p: any) => p.id === postId);
            cache.evict(postToDelete[0].id)
            cache.gc()
            if (callback) {
                callback()
            }
        },
        variables: {
            postId
        }
    })
    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => deleteMutation()}
            />
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;