// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecoCanvasItem from "./CanvasItem";

// 추천 캔버스
const RecoContainer = styled.div`
    width: 22rem;
    height: 7rem;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const RecoCanvasItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

function CanvasList(props){
  return (
    <RecoContainer>
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