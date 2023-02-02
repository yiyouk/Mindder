import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import { Wrapper } from "./PostEmotag";

const CrawlingsHere = styled.div`
  height: 71px;
  border: 1px solid #000000;
  border-radius: 6px;
`

const CanvasDiv = styled.div`
  height: 358px;
  background: #FFFFFF;
  /* border: 1px solid #7767FD; */
  border-radius: 19px;
  position:relative;
  bottom:2rem;
`

function PostDraw(props){
  return (
    <Wrapper>
      <CrawlingsHere>여기에 크롤링 결과 출력할거에요</CrawlingsHere>
      <CanvasDiv>
        <Canvas/>
      </CanvasDiv>
    </Wrapper>
  );
};

export default PostDraw;