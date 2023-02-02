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
    width: calc(100% - 1rem) !important;
    height:31.5rem;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
    margin-top:1rem;
`;

export const CardContainer = styled.div`
  /* width:330px; */
  display:grid;
  justify-items: center;
  align-items:center;
  grid-template-columns: repeat(4, 1fr);
  padding:0.7rem;
  column-gap:${(customProps)=>`${customProps.columnGap}rem`};
  /* border: 1px solid black; */
`
export const EmotionTag = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 4.3rem;
  height: 3.3rem;
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

    const onClick = (e, emo) => {
        // currentTarget 사용하면 자식요소클릭을 막고 현재 클릭한 타겟만 안정적으로 잡아준다.
        const selectedSrc = require(`../../assets/images/face${e.currentTarget.id}.png`)
        setImgSrc(selectedSrc)
        dispatch(userAction.SAVE({selected:selectedSrc, case:"imgSrc"}))
        dispatch(userAction.SAVE({selected:emo.name, case:"emoTag"}))
    }
    return (
        <Wrapper>
            <EmoHeader text="오늘의 감정은 어떤가요?"/>
            <TodayEmotion
            imgSrc={imgSrc}
            />
            <CardContainer columnGap={0.2}>
                {Emoticons.map((emo)=>( 
                    <EmotionTag
                    key={emo.id} id={emo.id}
                    onClick={(e)=>{onClick(e, emo)}}
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
