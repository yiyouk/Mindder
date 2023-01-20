import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import EmotionTagList from "./EmoTagList";
import TodayEmotion from "./TodayEmotion";
import EmoHeader from "./EmoHeader";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function PostEmoTag(props) {
    const navigate = useNavigate();
    
    return (
        <Wrapper>
            <EmoHeader text="오늘의 감정은 어떤가요?"/>
            <TodayEmotion/>
            <EmotionTagList
                line={1}
            />
            <EmotionTagList
                line={2}
            />
            <EmotionTagList
                line={3}
            />
            <EmotionTagList
                line={4}
            />
        </Wrapper>
    );
}

export default PostEmoTag;
