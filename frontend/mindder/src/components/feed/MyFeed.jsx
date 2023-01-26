// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import UserProfile from "../user/UserProfile";
import Img from "../../assets/images/pro.jpg";
import Context from "./Context";
import CommentList from "./CommentList";
import data from '../../data.json';

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ImgPro = styled.div`
    width: 19rem;
    height: 20rem;
    margin-top: 0.3rem;
    border-radius: 5px;
    background-image:url(${Img});
    background-size:cover;
`

function MyFeed(props) {
    const post = data.find((item) => {
        return item.id == 1;
    });

    console.log(post);

    return (
        <Wrapper>
            <UserProfile></UserProfile>
            <ImgPro></ImgPro>
            <Context></Context>
            <CommentList comments={post.comments} />
        </Wrapper>
    );
}

export default MyFeed;
