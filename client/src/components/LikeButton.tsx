import React, { useState, useEffect } from "react";
import { Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

interface PropTypes {
    user: {
        username: string
    },
    id: number,
    likes: [string],
    likeCount: number
}

const LikeButton = ({ user, id, likes, likeCount }: PropTypes): JSX.Element => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like: any) => like.username === user.username)) {
            setIsLiked(true);
        } else setIsLiked(false);
    }, [user, likes]);

    const [likePost]: any = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        isLiked ? (
            <Button color="blue">
                <Icon name="heart" />
            </Button>
        ) : (
                <Button color="blue" basic>
                    <Icon name="heart" />
                </Button>
            )
    ) : (
            <Button as={Link} to="/login" color="blue" basic>
                <Icon name="heart" />
            </Button>
        );

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}
            <Label basic color="blue" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;