// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecoCanvasItem from "./recoCanvasItem";

// 추천 캔버스
const RecoContainer = styled.div`
    margin-top:10px;
    width: 360px;
    height: 152px;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    /* border : 1px solid black; */
    /* background-color:#7767FD; */
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const RecoHeader = styled.h4`
    font-size:16px;
    font-weight:900;
    /* color:white; */
    position:relative;
    right:120px;
    margin: 0;
`

const RecoCanvasItemContainer = styled.div`
    /* border : 1px solid black; */
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

`

function RecoCanvasList(props){
  return (
    <RecoContainer>
      <RecoHeader>추천 캔버스</RecoHeader>
      <RecoCanvasItemContainer>
        {/* 여기서 for문 */}
        <RecoCanvasItem/>
        <RecoCanvasItem/>
        <RecoCanvasItem/>
      </RecoCanvasItemContainer>
    </RecoContainer>  
  );
}

export default RecoCanvasList;