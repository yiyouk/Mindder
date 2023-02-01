// 추천 캔버스 출력할 컴포넌트
import React, {useEffect, useState} from "react";
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

function CanvasList(props){
 const navigate = useNavigate()

  const feedList = props.feedList
  // emoteCompleteIdx : 완성된 곰돌이 이미지 id
  // fileIdx : 이미지파일의 id.
  // 이미지파일 얻으려면 이 id로 다시한번 요청보내야함

  // async function getBearImg (){
  //   try {
  //     const response = await api.post(`/file/${fileIdx}`, null);
  //   } catch (error) {
      
  //   }
  // }

  return (
    <Container>
      <CanvasItemContainer>
        {/* 서버 api 구현되면 주석 푸삼 */}
        {/* {feedList.map((feed)=>{
          <CanvasItem
          size={"s"} feedIdx={feed.feedIdx} commentCount={feed.commentCount} likeTotalCount={feed.likeTotalCount}
          />
        })} */}
        <CanvasItem size="s"/>
        <CanvasItem size="s"/>
        <CanvasItem size="s"/>
      </CanvasItemContainer>
    </Container>  
  );
}

export default CanvasList;