import React from "react";
import styled from "styled-components";
import Imag from "../../assets/images/joy.png";

const Wrapper = styled.div`
    display: flex;
    max-width: 21rem;
    background: white;
    align-items: center;
`;

const WrapperTop = styled.div`
    display: flex;
    flex-direction: column;
    width: 19rem;
    height: 4rem;
    margin: 0 0 0 1rem;
    background: white;
`;

const ContentText = styled.p`
    color: rgb(67, 67, 67);
    font-size: 0.75rem;
    max-width: 12rem;
    padding: 0 0 0 0;
    margin: 0 0 -2rem 0;
`;

const ProfileText = styled.p`
    color: rgb(67, 67, 67);
    font-weight: 600;
    font-size: 0.75rem;
`;

const ContextWrapper = styled.div`
    width: 16rem;
    max-width: 16rem;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
`;

const Date = styled.div`
    /* display: flex; */
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
    /* justify-content: center !important; */
`

const Image = styled.img`
    width: 2rem;
    height: 2rem;
    border: 1px solid #c0c0c0;
    border-radius: 100%;
`

function CommentListItem(props) {
    const { comment } = props;

    return (
        <Wrapper>
            <Image src = {Imag}></Image>
            <WrapperTop>
                <ContextWrapper>
                    <ProfileText>이유경</ProfileText>
                    <Date>2019.12.05</Date>
                </ContextWrapper>
            <ContentText>{comment.content}</ContentText>
            </WrapperTop>
        </Wrapper>
    );
}

export default CommentListItem;
