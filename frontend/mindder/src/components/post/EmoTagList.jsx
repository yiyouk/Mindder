import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width:330px;
  /* height:260px; */
  /* border: 1px solid black; */
  display:flex;
  justify-content: space-around;
  margin:8px auto;
`

const EmotionTag = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 68px;
  height: 51px;
  border: 1px solid black;
`

function EmotionTagList(props){
  const line = props.line
  const num = (line*4)-3

  return (
    <Container>
      <EmotionTag>
        {num}
      </EmotionTag>
      <EmotionTag>
        {num+1}
      </EmotionTag>
      <EmotionTag>
        {num+2}
      </EmotionTag>
      <EmotionTag>
        {num+3}
      </EmotionTag>
    </Container>
  )
}

export default EmotionTagList;
