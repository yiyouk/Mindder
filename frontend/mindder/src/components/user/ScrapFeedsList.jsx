// 추천 캔버스 출력할 컴포넌트
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Profile from "../../commons/ui/Profile";
import CanvasItem from "../../commons/list/CanvasItem";

import api from "../../api/api";
import dayjs from 'dayjs';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border:1px solid black; */
`;

const ScrapFeedsItemContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
`

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>span{
       font-size : 0.8rem;
       color: grey;
       margin-top: 1rem;
    }
`

const M = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function ScrapFeedsList(props){
  const navigate = useNavigate();
  const [scrapFeeds, setScrapFeeds] = useState([]);

  useEffect(() => {
      getScrapFeeds();
  }, [])


  // 스크랩 글 가져오기
  const getScrapFeeds = async() => {
      try {
          const response = await api.get(`/scraps/my`);
          console.log(response.data)
          if(response.data.success){
              console.log(response.data.data);
              setScrapFeeds(response.data.data)
          } else {
                console.log('조회 실패')
          }

      } catch (e) {
          console.error(e);
          navigate("/error");
      }
    }

return (

    <Wrapper>
        { !scrapFeeds || scrapFeeds.length === 0? ( 
            <M>
                <div>저장한 글이 없습니다.</div>   
            </M>
        ):(
            <>
                {scrapFeeds.map((feeds, idx) => (
                    <ScrapFeedsItemContainer key={idx}>
                        <ProfileContainer>
                            <Profile key={idx} imgsize='s' userIdx={feeds.userIdx} namesize='s' name={feeds.nickname} imgSrc={feeds.userBase64}/>
                            <span>{dayjs(feeds.updateDate).get('year')}년 {dayjs(feeds.updateDate).get('month')}월 {dayjs(feeds.updateDate).get('date')}일</span>
                        </ProfileContainer>
                        <CanvasItem key={idx} size='ml' list={feeds} up={true} />
                    </ScrapFeedsItemContainer>
                    ))
                }
            </>
        )}
    </Wrapper>  
);
}


export default ScrapFeedsList;