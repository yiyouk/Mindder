// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasItem from "./CanvasItem";
import api from "../../api/api";

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

function CanvasList({list}){
 const navigate = useNavigate()

  return (
    <Container>
      <CanvasItemContainer>
        {list ? list.map((feed, index)=>{
          return <CanvasItem key={index} size="s" feedIdx={feed.feedIdx}/>
        }): null}
      </CanvasItemContainer>
    </Container>  
  );
}

export default CanvasList;