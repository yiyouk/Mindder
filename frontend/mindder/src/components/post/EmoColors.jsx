import React from "react";
import styled from "styled-components";


function EmotionColorList(props){
  const colorCode = props.colorCode
  
  const EmotionColor = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 53px;
  height: 53px;
  /* border: 1px solid black; */
  background-color:${colorCode};
  margin:0.5rem;
flex-direction:column;
display:flex;
align-items:center;
  `

  return (
    <>
      <EmotionColor
      />
    </>
  )
}

export default EmotionColorList;
