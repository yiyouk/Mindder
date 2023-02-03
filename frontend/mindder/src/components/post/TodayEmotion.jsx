import React from "react";
import styled from "styled-components";
import Image from "react-image-webp";

const TodayEmotionDiv = styled.div`
    width: 11rem;
    height: 11rem;
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
    <TodayEmotionDiv
      // bgImg={props.imgSrc}
    >
      <Image
        webp={props.imgSrc}
        style={{width:"11rem"}}
      />
    </TodayEmotionDiv>
  )
}

export default TodayEmotion;