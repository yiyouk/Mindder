import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import api from '../../api/api'
import CanvasItem from "../../commons/list/CanvasItem";
import { useSelector } from "react-redux";
import {ScrollMenu} from 'react-horizontal-scrolling-menu'
import { Colors16 } from "../../redux/reducers";

export const Wrapper = styled.div`
    height:31rem;
    display: grid;
    grid-template-rows: 1fr 5fr;
    margin-top:1rem;
`;

const CrawlingsHere = styled.div`
  height: 71px;
  border: 1px solid #7767FD;
  border-radius: 6px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  /* grid-template-rows: repeat(1, 1fr) !important; */
  /* position:relative; */
  /* top:-1rem; */
`
const CanvasDiv = styled.div`
  height: 358px;
  background: #FFFFFF;
  border-radius: 19px;
`

function PostDraw(props){
  const getGuideImg = async(todayColor, setCrawlingList) => {
    if (!todayColor){
      alert('감정색이 선택되지 않았습니다')
      return
    }
    
    try {
      const response = await api.get(`/feeds/crawling/${todayColor}`, null)
      console.log(response.data)
  
      if (response.data.success===true){
        const imgSrc = response.data.data
        setCrawlingList(imgSrc)
      }
  
    } catch (error) {
      
    }
  }

  const [crawlingList, setCrawlingList] = useState([])
  const todayColor = useSelector((state)=>state.USER.todayColor)
  console.log(todayColor)
  //오늘의 감정 영어로 바꿔서 담은 변수
  const findEn = Colors16.find(color=>color.name===todayColor).en  

  useEffect(()=>{
    getGuideImg(findEn, setCrawlingList)
  }, [])

  return (
    <Wrapper>
      <CrawlingsHere>
        {/* <ScrollMenu wheel={true}> 스크롤 오류나서 일단 5개만 잘라서 받아놓음 */} 
        {crawlingList.slice(0,5).map((crawlingImg, index)=>(
          <CanvasItem size={"xs"} imageUrl={crawlingImg.img} key={index}
          feedIdx={crawlingImg.url}
          />
        ))}
        {/* </ScrollMenu> */}
      </CrawlingsHere>
      <CanvasDiv>
        <Canvas/>
      </CanvasDiv>
    </Wrapper>
  );
};

export default PostDraw;