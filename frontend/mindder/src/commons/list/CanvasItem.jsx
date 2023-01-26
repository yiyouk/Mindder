// 추천 캔버스 개별 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasSample from "../../assets/images/CanvasSample.png"

const RecoCanvas = styled.div`
  width: 6rem;
  height: 6rem;
  background-image:url(${CanvasSample});
  background-size:cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
`

function CanvasItem(props) {
  return(
    <RecoCanvas></RecoCanvas>
  )
}

export default CanvasItem;