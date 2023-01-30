import React from "react";
import styled from "styled-components";


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
    background-image:url(${(props) => (props.bgImg)});
    background-size:cover;
`

function TodayEmotion(props){
  return(
    <TodayEmotionDiv
      bgImg={props.imgSrc}
    >
    </TodayEmotionDiv>
  )
}

export default TodayEmotion;