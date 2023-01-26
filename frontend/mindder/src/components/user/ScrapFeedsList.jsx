// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ScrapFeedsItem from "./ScrapFeedsItem";
import ProfileImage from "../../commons/ui/ProfileImage";


const Wrapper = styled.div`
      width: 100%;
      align-items: center;
      justify-content: center;
      
      width: 360px;
      max-width: 720px;
    /* & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    } 
    border : 1px solid black;
    background-color:#7767FD;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column; */
`;


const ScrapFeedsItemContainer = styled.div`
    /* border : 1px solid black; */
    width:100%;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;

`

function ScrapFeedsList(props){
  return (
    <Wrapper>
      <ScrapFeedsItemContainer>
        {/* 여기서 for문 */}
        <ScrapFeedsItem/>
        <ScrapFeedsItem/>
        <ScrapFeedsItem/>
        <ScrapFeedsItem/>
      </ScrapFeedsItemContainer>
    </Wrapper>  
  );
}

export default ScrapFeedsList;