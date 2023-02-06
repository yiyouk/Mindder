import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from '../../api/api'

const Wrapper = styled.div`
    width: calc(100% - 0.5rem);
    height:31rem;
    display: grid;
    /* flex-direction:column; */
    /* justify-content:center; */
    /* align-items:center; */
    margin-top:1rem;
    margin-left:0.5rem;
    & > * {
      width:inherit;
    }
`;

const CanvasDiv = styled.img`
  height: 17rem;
  border: 1px solid #7767FD;
  border-radius: 19px;
  object-fit:contain;
`
const CommentDiv = styled.textarea`
  height: 113px;
  border: 1px solid #ACA4A4;
  border-radius: 6px;
  font-family: 'Inter';
  /* font-style: normal; */
  /* font-size: 14px; */
`

const BottomDiv = styled.div`
  height:4rem;
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
const Toggle = styled.button`
  width: 42px;
  height: 24px;
  /* border-radius: 30px; */
  /* border: 1px solid grey; */
  cursor: pointer;
  /* background-color: ${(props) => (!props.toggle ? "none" : "rgb(51,30,190)")}; */
  position: absolute;
  left:23%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background: #FFFFFF;
  border: 1px solid #7767FD;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  background: #7767FD;
  border-radius: 50px;
  position: absolute;
  right: 2%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(-20px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const Container = styled.div`
  display:flex;
  align-items:center;
  padding-left:10px;
`

function PostCommentwrite(props){
  const navigate = useNavigate()
  const userDraw = useSelector((state)=>state.USER.userDrawing)
  const emoTag = useSelector((state)=>state.USER.todayEmotion)
  const emoColor = useSelector((state)=>state.USER.todayColor)
  const placeHolder = "오늘의 감정과 함께 기록할 코멘트를 남겨주세요. (선택)"
  const [userComment, setUserComment] = useState('')
  const [isPublic, setIsPublic] = useState(true);
  const clickedToggle = () => {
    setIsPublic((prev) => !prev);
  };
  const onChange = (e)=>{
    // console.log(e.target.value)
    setUserComment(e.target.value)
  }

  const writeFeed = async ()=>{
    const requests = {
      emoteTagIdx : emoTag,
      emoteColorTagIdx : emoColor,
      fileIdx : null,
      mainText : userComment,
      normalTag : null,
      isPublic : isPublic,
    }
    console.log(requests)
    try {
      const response = await api.post(`/feeds`, requests)
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const getFileIdx = async()=>{
    const decodImg = atob(userDraw.split(',')[1]);
    // console.log(decodImg)
    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i));
    }

    let file = new Blob([new Uint8Array(array)], {type: "image/webp"});
    console.log(file)
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData)

    try {
      const fileResponse = await api.post(`file/`, {
      data:formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      cache: false,
      contentType: false,
      processData: false,
      })
      console.log(fileResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const onClick = ()=>{
    getFileIdx()
    // writeFeed()
    navigate('/feeds')
  }

  return (
    <Wrapper>
      <CanvasDiv src={userDraw}>
      </CanvasDiv>
      <CommentDiv placeholder={placeHolder}
      onChange={onChange}
      ></CommentDiv>
      <BottomDiv>
        <Container>
          <h4>{isPublic ? "공 개" : "비공개"}</h4>
          <Toggle onClick={clickedToggle} toggle={isPublic}>
            <Circle toggle={isPublic}/>
          </Toggle>
        </Container>
        <PostBtn
        onClick={onClick}
        >작 성</PostBtn>
      </BottomDiv>
    </Wrapper>
  );
};

export default PostCommentwrite;