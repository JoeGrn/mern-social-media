import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../gql';
import HoverText from './HoverText'

import { IPost } from '../interfaces'

interface Props {
    postId?: string | number
    commentId?: string
    callback?: any
}

interface ReadQueryResult {
    getPosts: Array<IPost>
}

const DeleteButton: React.FC<Props> = ({ postId, commentId, callback }) => {
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteMutation] = useMutation(mutation, {
        update(cache) {
            setConfirmOpen(false)
            if (!commentId) {
                const cacheResponse: any = cache.readQuery<ReadQueryResult>({
                    query: FETCH_POSTS_QUERY
                })
                const postToDelete = cacheResponse.getPosts.filter((post: IPost) => post.id === postId);
                cache.evict(postToDelete[0].id)
                cache.gc()
            }
            if (callback) {
                callback()
            }
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <>
            <HoverText
                content={
                    commentId
                        ? 'Delete comment'
                        : 'Delete post'
                }
            >
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </HoverText>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => deleteMutation()}
            />
        </>
    );
}

export default DeleteButton;