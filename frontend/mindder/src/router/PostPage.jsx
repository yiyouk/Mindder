// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import PostEmoTag from "../components/post/PostEmotag";
import PostEmocolor from "../components/post/PostEmocolor";
import PostDraw from "../components/post/PostDraw";
import PostCommentwrite from "../components/post/PostCommentwrite";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function PostPage(props) {
    return (
        <Wrapper>
          {/* <PostEmoTag/>
          <PostEmocolor/> */}
          <PostDraw/>
          {/* <PostCommentwrite/> */}
        </Wrapper>
    );
}

export default PostPage;
