import React from "react";
import styled from "styled-components";

const TodayEmotionDiv = styled.div`
    width: 140px;
    height: 140px;
    /* border: 1px solid black; */
    margin: auto;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    top:5px;
`

function TodayEmotion(props){
  return(
    <TodayEmotionDiv>
      <img
      src={props.imgSrc}
      width={180}
      height={180}
      />
    </TodayEmotionDiv>
  )
}

export default TodayEmotion;