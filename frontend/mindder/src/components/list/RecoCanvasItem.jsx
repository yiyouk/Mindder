// 추천 캔버스 개별 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasSample from "../../images/CanvasSample.png"

const RecoCanvas = styled.div`
  /* position: absolute; */
  width: 100px;
  height: 92px;
  /* border : 1px solid black; */
  background-image:url(${CanvasSample});
  background-size:cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
`

function RecoCanvasItem(props) {
  return(
    <RecoCanvas></RecoCanvas>
  )
}

export default RecoCanvasItem;