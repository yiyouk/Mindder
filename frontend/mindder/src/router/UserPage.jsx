// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/api";
import UserMenu from "../components/user/UserMenu";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import CanvasItem from "../commons/list/CanvasItem";
import { ProfileContainer } from "../components/user/UserMenu";
import { SAVE_otherUserIdx } from "../redux/reducers";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const AlbumWrapper = styled.div`
    width: 21rem;
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const AlbumContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.7rem;
      align-items: center;
      justify-content: center;
 `

function UserPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userFeeds, setUserFeeds] = useState([])

    const userIdx = 14;
    const myIdx = useSelector((state)=>state.USER.userIdx);
    
    const getUserId = () => {
        if(userIdx !== myIdx){
            dispatch(SAVE_otherUserIdx(userIdx))
        } else{
            dispatch(SAVE_otherUserIdx(''))
        }
    }

    // 피드 요청
    async function getUserFeeds(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/feeds/${userIdx}`, null);

            if(response.data.success===true){
                console.log(`마이페이지 : ${response.data.message}`);
                console.log(response.data)
                const userFeedList = response.data.data
                console.log(userFeedList)
                
                setUserFeeds(userFeedList)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    useEffect(() => {
        getUserId()
        getUserFeeds()
    }, [])

    
    return (
        <Wrapper>
            {/* 여기는 유저페이지 */}
            <ProfileContainer>
                <UserMenu userIdx={userIdx}></UserMenu>
            </ProfileContainer>

            {/* <UserFeedsList></UserFeedsList> */}
            <AlbumWrapper>
                <AlbumContainer>
                    {userFeeds.map((recentFeed, idx) => (
                    <CanvasItem feedIdx={recentFeed.feedIdx} imageUrl={recentFeed.imageUrl} commentCount={recentFeed.commentCount} likeTotalCount={recentFeed.likeTotalCount} key={idx}></CanvasItem>
                    ))}
                </AlbumContainer>
            </AlbumWrapper>
        </Wrapper>
    );
}

export default UserPage;
