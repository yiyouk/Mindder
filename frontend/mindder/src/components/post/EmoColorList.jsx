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

const EmotionColor = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 53px;
  height: 53px;
  border: 1px solid black;
`

function EmotionColorList(props){
  const line = props.line
  const num = (line*4)-3

  return (
    <Container>
      <EmotionColor>
        {num}
      </EmotionColor>
      <EmotionColor>
        {num+1}
      </EmotionColor>
      <EmotionColor>
        {num+2}
      </EmotionColor>
      <EmotionColor>
        {num+3}
      </EmotionColor>
    </Container>
  )
}

export default EmotionColorList;
