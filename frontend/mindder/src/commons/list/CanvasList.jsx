// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasItem from "./CanvasItem";

// 추천 캔버스
const Container = styled.div`
    width: 22rem;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const CanvasItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

function CanvasList(props){
  return (
    <Container>
      <CanvasItemContainer>
        {/* 여기서 for문 */}
        <CanvasItem size="s"/>
        <CanvasItem size="s"/>
        <CanvasItem size="s"/>
      </CanvasItemContainer>
    </Container>  
  );
}

export default CanvasList;