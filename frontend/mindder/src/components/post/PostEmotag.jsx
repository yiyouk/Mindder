import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import EmotionTag from "./EmoTagList";
import TodayEmotion from "./TodayEmotion";
import EmoHeader from "./EmoHeader";


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



function PostEmoTag(props) {

    return (
        <Wrapper>
            <EmoHeader text="오늘의 감정은 어떤가요?"/>
            <TodayEmotion/>
            <CardContainer>
                <EmotionTag              
                />
            </CardContainer>
        </Wrapper>
    );
}

export default PostEmoTag;
