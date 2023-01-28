import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
// import EmotionTag from "./EmoTagList";
import TodayEmotion from "./TodayEmotion";
import EmoHeader from "./EmoHeader";
import EmoTag from "./EmoTag";

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    height:31.5rem;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
`;

const CardContainer = styled.div`
  width:330px;
  /* height:260px; */
  /* border: 1px solid black; */
  display:grid;
  justify-content: center;
  align-items:center;
  grid-template-columns: repeat(4, 1fr);
  /* padding:10px; */
  /* margin:8px auto; */
  /* border: 1px solid black; */
`
const EmotionTag = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 68px;
  height: 51px;
  /* border: 1px solid black; */
  margin:0.5rem;
  flex-direction:column;
  display:flex;
  align-items:center;
`

function PostEmoTag(props) {
    const Emoticons = [
        {
            id:1,
            name:"화남",
        },
        {
            id:2,
            name:"기쁜",
        },
        {
            id:3,
            name:"외로움",
        },
        {
            id:4,
            name:"우울",
        },
        {
            id:5,
            name:"피곤",
        },
        {
            id:6,
            name:"만족",
        },
        {
            id:7,
            name:"행복",
        },
        {
            id:8,
            name:"슬픔",
        },
        {
            id:9,
            name:"불안",
        },
        {
            id:10,
            name:"아픔",
        },
        {
            id:11,
            name:"불쾌",
        },
        {
            id:12,
            name:"실망",
        },
        {
            id:13,
            name:"긴장",
        },
        {
            id:14,
            name:"신남",
        },
        {
            id:15,
            name:"지루함",
        },
        {
            id:16,
            name:"?",
        },
      ]

    const defaultSrc = require("../../assets/images/face2.png")

    const [imgSrc, setImgSrc] = useState(defaultSrc)

    return (
        <Wrapper>
            <EmoHeader text="오늘의 감정은 어떤가요?"/>
            <TodayEmotion
            imgSrc={imgSrc}
            />
            <CardContainer>
                {Emoticons.map((emo)=>(
                    <EmotionTag
                    key={emo.id} id={emo.id}
                    onClick={(e)=>{
                    // currentTarget 사용하면 자식요소클릭을 막고 현재 클릭한 타겟만 안정적으로 잡아준다.
                    // console.log(e.currentTarget.childNodes[0].src)
                    const selectedSrc = e.currentTarget.childNodes[0].src
                    setImgSrc(selectedSrc)
                    }}
                    >
                        <EmoTag
                        key={emo.id} emoId={emo.id} emoName={emo.name} 
                        />
                    </EmotionTag>
                ))}
            </CardContainer>
        </Wrapper>
    );
}

export default PostEmoTag;
