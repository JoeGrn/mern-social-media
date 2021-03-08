import React, { useContext } from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const Post = ({
    post: { body, id, username, createdAt, likeCount, commentCount, likes },
}: any): JSX.Element => {
    const { user } = useContext(AuthContext);

    const likePost = () => {
        console.log("likedPost");
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />
                <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                    <Button color="blue" basic>
                        <Icon name="comment" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    );
};

export default Post;
