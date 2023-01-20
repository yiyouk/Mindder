import React from "react";
import styled from "styled-components";

import './style.css'
// import './mycanvas'

const Wrapper = styled.div`
    padding: 16px;
    /* width: calc(100% - 32px); */
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* border:1px solid red; */
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
      <CanvasDiv>
        <canvas></canvas>
        <div class="menu-container">
          <button id="mode-btn">채우기</button>
          <button class="reset">지우기</button>
          <button class="palette">팔레트</button>
        </div>
        {/* <script src="mycanvas.js"></script> */}
      </CanvasDiv>
    </Wrapper>
  );
};

export default PostDraw;