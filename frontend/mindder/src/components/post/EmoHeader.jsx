import React from "react";
import styled from "styled-components";

const Header = styled.h2`
    /* font-family: 'Inter'; */
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    margin:auto;
    position:relative;
    /* top:6rem; */
    /* border:1px solid red; */
`;

function EmoHeader(props){
  return(
    <>
      <Header>{props.text}</Header>
    </>
  )
}

export default EmoHeader;