import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import EmotionTagList from "./emotionTagList";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Header = styled.h2`
    /* font-family: 'Inter'; */
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    margin-bottom:5px;
`;

const TodayEmotion = styled.div`
    width: 140px;
    height: 140px;
    border: 1px solid black;
    margin: 18px auto;
`

function PostEmoTag(props) {
    
    const navigate = useNavigate();
    
    return (
        <Wrapper>
            <Header>오늘의 감정은 어떤가요?</Header>
            <TodayEmotion/>
            <EmotionTagList/>
            <EmotionTagList/>
            <EmotionTagList/>
            <EmotionTagList/>
        </Wrapper>
    );
}

export default PostEmoTag;
