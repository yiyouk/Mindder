import React from "react";
import styled from "styled-components";
import EmoHeader from "./EmoHeader";
import TodayEmotion from "./TodayEmotion";
import EmotionColorList from "./EmoColorList";

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    height:31.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
    
`;

function PostEmocolor(props){
  return (
    <Wrapper>
      <EmoHeader text="감정의 색을 채워주세요"/>
      <TodayEmotion/>
      <EmotionColorList line={1}/>
      <EmotionColorList line={2}/>
      <EmotionColorList line={3}/>
      <EmotionColorList line={4}/>
    </Wrapper>
  )
}

export default PostEmocolor;