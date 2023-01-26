import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
    width: 19em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props) {
    const { comments } = props;

    return (
        <Wrapper>
            {comments.map((comment, index) => {
                return <CommentListItem key={comment.id} comment={comment} />;
            })}
        </Wrapper>
    );
}

export default CommentList;
