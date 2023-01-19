import React from "react";
import styled from "styled-components";

const TodayEmotionDiv = styled.div`
    width: 140px;
    height: 140px;
    border: 1px solid black;
    margin: 18px auto;
`

function TodayEmotion(props){
  return(
    <>
      <TodayEmotionDiv/>
    </>
  )
}

export default TodayEmotion;