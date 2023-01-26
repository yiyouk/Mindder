import React from "react";
import styled from "styled-components";
import ProfileImage from "../../commons/ui/ProfileImage2";

const Wrapper = styled.div`
    width: 19rem;
    background: white;
`;

const ContentText = styled.p`
    color: rgb(67, 67, 67);
    margin: 0.2rem 0 0.6rem 0;
    font-size: 0.85rem;
`;

const ContextWrapper = styled.div`
    width: 19em;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
`;

const Date = styled.div`
    display: flex;
    font-size: 0.8rem;
    color: rgb(67, 67, 67);
    justify-content: flex-end !important;
`

function CommentListItem(props) {
    const { comment } = props;

    return (
        <Wrapper>
            <ContextWrapper>
                <ProfileImage name="유경"></ProfileImage>
                <Date>2019.12.05</Date>
            </ContextWrapper>
            <ContentText>{comment.content}</ContentText>
        </Wrapper>
    );
}

export default CommentListItem;
