import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas";

import './style.css'
// import './mycanvas'

const Wrapper = styled.div`
    /* padding: 0; */
    /* width: calc(100% - 2rem); */
    height:31.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* border:1px solid blue; */
`

const CrawlingsHere = styled.div`
  width: 330px;
  height: 71px;
  border: 1px solid #000000;
  border-radius: 6px;
`

const CanvasDiv = styled.div`
  width: 330px;
  height: 358px;
  background: #FFFFFF;
  border: 1px solid #7767FD;
  border-radius: 19px;
`

function PostDraw(props){
  return (
    <Wrapper>
      <CrawlingsHere>여기에 크롤링 결과 출력할거에요</CrawlingsHere>
      {/* <CanvasDiv> */}
        <Canvas></Canvas>

      {/* </CanvasDiv> */}
    </Wrapper>
  );
};

export default PostDraw;