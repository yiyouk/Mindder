import React from "react";
import styled from "styled-components";

const ImgDiv = styled.img`
  size:cover;
  position:relative;
  top:-3px;
`
const EmoName = styled.div`
  font-size:x-small;
  font-weight:600;
  position:relative;
  top:-10px;
`

function EmoTag(props){
  const imgSrc = require(`../../assets/images/face${props.emoId}.png`)

  return(
    <>
      <ImgDiv src={imgSrc}
      width={48}
      height={48}
      />
      <EmoName
      >{props.emoName}</EmoName>
    </>
  )
}

export default EmoTag;
