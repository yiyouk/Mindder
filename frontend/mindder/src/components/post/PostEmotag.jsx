import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
// import EmotionTag from "./EmoTagList";
import TodayEmotion from "./TodayEmotion";
import EmoHeader from "./EmoHeader";
import EmoTag from "./EmoTag";
import { useSelector, useDispatch } from "react-redux";
import { Emoticons } from "../../redux/store";
import { userAction } from "../../redux/store";

export const Wrapper = styled.div`
    width: calc(100% - 2rem);
    height:31.5rem;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
    margin-top:1rem;
`;

export const CardContainer = styled.div`
  width:330px;
  display:grid;
  justify-content: center;
  align-items:center;
  grid-template-columns: repeat(4, 1fr);
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
    const selectedEmo = useSelector((state)=>state.userState.emotagSrc)
    // console.log(selectedEmo)

    const dispatch = useDispatch()

    const [imgSrc, setImgSrc] = useState(selectedEmo)

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
                    const selectedSrc = require(`../../assets/images/face${e.currentTarget.id}.png`)
                    setImgSrc(selectedSrc)
                    dispatch(userAction.SAVE({selected:selectedSrc, case:"imgSrc"}))
                    dispatch(userAction.SAVE({selected:emo.name, case:"emoTag"}))
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
