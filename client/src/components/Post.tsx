import React from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({
  post: { body, id, username, createdAt, likeCount, commentCount, likes }
}: any) => {
  const likePost = () => {
    console.log("likedPost");
  };

  const commentOnPost = () => {
    console.log("commentedOnPost");
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
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="blue" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="blue" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comment" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Post;
