// 추천 캔버스 출력할 컴포넌트
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Profile from "../../commons/ui/Profile";
import CanvasItem from "../../commons/list/CanvasItem";

import api from "../../api/api";

const Wrapper = styled.div`
      align-items: center;
      justify-content: center;
      

`;


const ScrapFeedsItemContainer = styled.div`
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
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
          if(response.data.success){
              console.log(response.data.data);
              setScrapFeeds(response.data.data)
          
          } else {
              alert("데이터를 조회하지 못했습니다.");
          }

      } catch (e) {
          console.error(e);
          navigate("/error");
      }
  }
return (

    <Wrapper>
        { !scrapFeeds || scrapFeeds.length === 0? ( 
            <div>저장한 글이 없습니다.</div>   
        ):(
            <>
                {scrapFeeds.map((feeds, idx) => (
                    <ScrapFeedsItemContainer>
                        <ProfileContainer>
                            <Profile imgsize='s' userIdx={feeds.userIdx} namesize='s' name={feeds.nickname}/>
                            <span>{feeds.updateDate}</span>
                        </ProfileContainer>
                        <CanvasItem size='ml' list={feeds} up={true} />
                    </ScrapFeedsItemContainer>
                    ))
                }
            </>
        )}
    </Wrapper>  
);
}


export default ScrapFeedsList;