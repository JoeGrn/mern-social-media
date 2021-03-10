import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Card, Button, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';
import { RouteComponentProps } from "react-router-dom";


import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
interface MatchParams {
    postId: string
}
interface PropTypes extends RouteComponentProps<MatchParams> {
}

const SinglePost = ({ match, history }: PropTypes): JSX.Element => {
    const postId = match.params.postId
    const user: any = useContext(AuthContext)
    const [comment, setComment] = useState('');

    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            postId,
            body: comment
        }
    });

    const deletePostCallback = () => {
        history.push('/')
    }

    let postMarkup;
    if (loading) {
        postMarkup = <p>Loading...</p>
    } else {
        const { getPost } = data
        const {
            id,
            body,
            createdAt,
            username,
            likes,
            likeCount,
            commentCount,
            comments
        } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                {console.log(moment(createdAt).fromNow())}
                                {console.log(createdAt)}
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} id={id} likeCount={likeCount} likes={likes} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('Comment on post')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment.."
                                                name="comment"
                                                value={comment}
                                                onChange={(event) => setComment(event.target.value)}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ''}
                                                onClick={() => submitComment()}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((comment: any) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost