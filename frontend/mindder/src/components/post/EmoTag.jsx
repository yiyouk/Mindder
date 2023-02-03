import React from "react";
import styled from "styled-components";
import Image from "react-image-webp"


const EmoName = styled.div`
  font-size:x-small;
  font-weight:600;
  position:absolute;
  margin-top:41px;
`

function EmoTag(props){
  const imgSrc = require(`../../assets/images/face${props.emoId}.png`)
  const webpSrc = require(`../../assets/images/face${props.emoId}.webp`)

  return(
    <>
      <Image width={48}
        webp={webpSrc}
        // src={imgSrc} 
      />
      <EmoName
      >{props.emoName}</EmoName>
    </>
  )
}

export default EmoTag;
