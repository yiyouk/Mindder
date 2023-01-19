import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`

const CrawlingsHere = styled.div`
  width: 330px;
  height: 71px;
  border: 1px solid #000000;
  border-radius: 6px;
`

function PostDraw(props){
  return (
    <Wrapper>
      <CrawlingsHere>여기에 크롤링 결과 출력할거에요</CrawlingsHere>
    </Wrapper>
  );
};

export default PostDraw;