// 추천 캔버스 출력할 컴포넌트
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasItem from "./CanvasItem";
// import api from "../../api/api";

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
 const navigate = useNavigate()

  const feedIdx = props.feedIdx
  return (
    <Container>
      <CanvasItemContainer>
        {/* {feedList.map((feed)=>{
          <CanvasItem
            feed={feed} key={feed.feedIdx} size={"s"}
          />
        })} */}
        <CanvasItem size="s" feedIdx={feedIdx}/>
        <CanvasItem size="s"/>
        <CanvasItem size="s"/>
      </CanvasItemContainer>
    </Container>  
  );
}

export default CanvasList;