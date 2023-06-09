import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import api from '../../api/api'
import CrawItem from "../../commons/list/CrawItem";
import { useSelector } from "react-redux";
import { Colors16 } from "../../redux/reducers";
import Swal from "sweetalert2";

const Wrapper = styled.div`
    & > * {
      width:inherit;
    }
`;

const CrawlingsHere = styled.div`
  margin: 1rem 0rem 1rem 0rem;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items:center;
`
const CanvasDiv = styled.div`
  height: 24rem;
  background: #FFFFFF;
  border-radius: 19px;
`


function PostDraw(props){
  const {canvasRef, imageSaved} = props
  const getGuideImg = async(todayColor, setCrawlingList) => {
    if (!todayColor){
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD', 
        text: '감정색이 선택되지 않았습니다.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인'
      });
      return
    }
    
    try {
      const response = await api.get(`/feeds/crawling/${todayColor}`, null)
      // console.log(response.data)
  
      if (response.data.success){
        const imgSrc = response.data.data
        setCrawlingList(imgSrc)
      }
    } catch (error) {
      
    }
  }

  const [crawlingList, setCrawlingList] = useState([])
  const todayColor = useSelector((state)=>state.USER.todayColor)
  const todayEmo = useSelector((state)=>state.USER.todayEmotion)
  //오늘의 감정 영어로 바꿔서 담은 변수
  const findEn = Colors16.find(color=>color.name===todayColor).en  

  useEffect(()=>{
    getGuideImg(findEn, setCrawlingList)
  }, [])

  return (
    <Wrapper>
      {/* <FeedInfoContainer>
        <FeenInfo>{`#${todayColor}`}</FeenInfo>
        <FeenInfo>{`#${todayEmo}`}</FeenInfo>
      </FeedInfoContainer> */}
      <CrawlingsHere>
        {/* <ScrollMenu wheel={true}> 스크롤 오류나서 일단 5개만 잘라서 받아놓음 */} 
        {crawlingList.slice(0,5).map((crawlingImg, index)=>(
          <CrawItem size="xs" imageUrl={crawlingImg.img} key={index} feedIdx={crawlingImg.url}/>
        ))}
        {/* </ScrollMenu> */}
      </CrawlingsHere>
      <CanvasDiv>
        <Canvas imageSaved={imageSaved} canvasRef={canvasRef}/>
      </CanvasDiv>
    </Wrapper>
  );
};

export default PostDraw;