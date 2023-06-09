import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from '../../api/api'

import {Emoticons, SAVE_postNum} from "../../redux/reducers";
import {Colors16} from "../../redux/reducers";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:1rem;
    & > * {
      width:inherit;
    }
`;

const CanvasDiv = styled.img`
  height: 18em;
  width: 18em;
  border: 0.01rem solid #c9c9c9;
  border-radius: 0.5rem;
`
const CommentDiv = styled.textarea`
  padding: 0.5rem;
  height: 6rem;
  width: 17.7rem;
  border: 0.01rem solid #7767FD;
  border-radius: 0.5rem;
  font-family: 'Inter';
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const BottomDiv = styled.div`
  height:4rem;
  width: 21rem;
  display:flex;
  align-items:center; 
  justify-content:space-between;
`

const PostBtn = styled.button`
  width: 4.5rem;
  height: 2.35rem;
  color: white;
  mix-blend-mode: normal;
  border: 1px solid #7767FD;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 1.2rem;
  background-color: #7767FD;
`
export const Toggle = styled.button`
  width: 3.1rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background: #7767FD;
  border: 1px solid #7767FD;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
  ${(props) =>
    props.toggle &&
    `
    background:white;
    `
    }
`;

export const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  background: white;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(20px, 0);
      transition: all 0.5s ease-in-out;
      background: #7767FD;
    `}
`;

const Container = styled.div`
  display:flex;
  align-items: center;
  font-size: 0.9rem;
  padding-left: 1rem;
`

function PostCommentwrite(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDraw = useSelector((state)=>state.USER.userDrawing)
  const emoTag = useSelector((state)=>state.USER.todayEmotion)
  const emoColor = useSelector((state)=>state.USER.todayColor)
  const myIdx = useSelector((state)=>state.USER.myIdx)
  const postNum = useSelector((state)=>state.USER.postNum)
  const [userComment, setUserComment] = useState('')
  const [isPublic, setIsPublic] = useState(true);

  const clickedToggle = () => {
    setIsPublic((prev) => !prev);
  };

  const onChange = (e)=>{
    setUserComment(e.target.value)
  }


  const writeFeed = async ()=>{
    try {
      const fileResponse = await api.post(`file`, {
        originalFile:`${Date.now()}_${myIdx}.webp`,
        base64:userDraw.split(',')[1],
      })
      // console.log(fileResponse)
      const fileIdx = fileResponse.data.data;
      const getNormalTag = userComment.match(/#[^\s#]+/g)
      const normalTag = getNormalTag ? getNormalTag.join('') : getNormalTag

      const getMainText = userComment.replace(/#[^\s#]+/g, '').split(' ').filter(function(item) {
        return item !== ''})
      const mainText = getMainText ? getMainText.join(' ') : getMainText
      
      const requests = {
        emoteIdx : Emoticons.find(emote=>emote.name===emoTag).id,
        emoteColorIdx : Colors16.find(color=>color.name===emoColor).id,
        fileIdx : fileIdx,
        mainText : mainText,
        normalTag : normalTag,
        public : isPublic,
      }
      const response = await api.post(`/feeds`, requests)
      dispatch(SAVE_postNum(postNum+1))

      navigate(`/f/${response.data.data}`);

    } catch (error) {
      // console.error(error)
    }
  }


  return (
    <Wrapper>
      <CanvasDiv src={userDraw}>
      </CanvasDiv>
      <CommentDiv placeholder="그림과 함께 기록할 글을 남겨주세요. &#13;(#을 사용하면 태그를 남길 수 있어요!)" onChange={onChange}/>
      <BottomDiv>
        <Container>
          <Toggle onClick={clickedToggle} toggle={isPublic}>
            <Circle toggle={isPublic}/>
          </Toggle>
          <h4>{isPublic ? "공 개" : "비공개"}</h4>
        </Container>
        <PostBtn onClick={writeFeed}>작 성</PostBtn>
      </BottomDiv>
    </Wrapper>
  );
};

export default PostCommentwrite;