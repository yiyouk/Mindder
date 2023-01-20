import React from "react";
import styled from "styled-components";
import ToggleBtn from "./ToggleBtn";
import styles from './style.css'

const Wrapper = styled.div`
    padding: 16px;
    /* width: calc(100% - 32px); */
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* border: 1px solid red; */
    
`

const CanvasDiv = styled.div`
  width: 330px;
  height: 258px;
  background: #FFFFFF;
  border: 1px solid #7767FD;
  border-radius: 19px;
`
const CommentDiv = styled.div`
  width: 330px;
  height: 113px;
  background: #FFFFFF;
  border: 1px solid #ACA4A4;
  border-radius: 6px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #A4A4A4;
`

const BottomDiv = styled.div`
  height:70px;
  width:330px;
  /* border:1px solid black; */
  display:flex;
  align-items:center; 
  justify-content:space-between;
`

const PostBtn = styled.button`
  width: 94px;
  height: 46px;
  mix-blend-mode: normal;
  border: 1px solid #7767FD;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  background-color:white;
  position:relative;
  right:10px;
  /* display: flex; */
  /* align-items: center;
  text-align: center; */
`


function PostCommentwrite(props){
  return (
    <Wrapper>
      <CanvasDiv/>
      <CommentDiv>오늘의 감정과 함께 기록할 코멘트를 남겨주세요. (선택)</CommentDiv>
      <BottomDiv>
        <ToggleBtn/>
        <PostBtn>작성</PostBtn>
      </BottomDiv>
    </Wrapper>
  );
};

export default PostCommentwrite;