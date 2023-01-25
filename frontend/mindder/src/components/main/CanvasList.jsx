// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecoCanvasItem from "./CanvasItem";

// 추천 캔버스
const RecoContainer = styled.div`
    margin-top:1rem;
    width: 22rem;
    height: 10rem;
    & > * {
        :not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const RecoHeader = styled.h4`
    font-size: 1rem;
    font-weight: 900;
    position:relative;
    right:120px;
    margin: 0;
`

const RecoCanvasItemContainer = styled.div`
    /* border : 1px solid black; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

`

function CanvasList(props){
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

export default CanvasList;