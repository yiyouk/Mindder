// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import api from "../api/api";

import UserMenuSub from "../components/user/UserMenuSub";
import UserFollow from "../components/user/UserFollow";

import CanvasItem from "../commons/list/CanvasItem";
import Profile from "../commons/ui/Profile";
import EditBtn from "../assets/images/editbtn.png";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* border: 1px solid; */
    /* height:inherit; */
`;
const AlbumWrapper = styled.div`
    width: 21rem;
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > * {
        color: grey;
        font-size: 0.8rem;
    }
`
const AlbumContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.7rem;
      align-items: center;
      justify-content: center;
 `

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: start;
    padding-left: 1.2rem;
`;

export const ProfileEditBtn = styled.div`
    width: 1rem;
    margin-left: 0.5rem;
    margin-right:0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
`

function UserPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 내껀지 타인껀지 확인.
    const [isMine, setIsMine] = useState()
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const userCheck =  () => {
        if (myIdx && (userIdx===myIdx)){
            setIsMine(true)        
        } else if (myIdx && (userIdx!==myIdx)){
            setIsMine(false)
        } else {
            console.log("아직 유저확인이 안됐다")
        }
    }
    const getUsersInfo = async() => {
        const response = await api.get(`/my/information/${userIdx}`);
        console.log(response.data.data)
        setNickname(response.data.data.nickname);
        setFollowingCount(response.data.data.followingCount);
        setFollowerCount(response.data.data.followerCount);
        setProfile(response.data.data.base64);
        setIsFollowing(response.data.data.followed)
    }
    async function getUserFeeds(){ // async, await을 사용하는 경우
        if (isMine===false){
            console.log("타인 페이지 피드목록 조회")
            try {
                const response = await api.get(`/my/feeds/${userIdx}`, null);
                console.log(response.data)
                if(response.data.success===true){
                    const userFeedList = response.data.data
                    setUserFeeds(userFeedList)
                } else {
                    alert("데이터를 조회하지 못했습니다.");
                }
            } catch (e) {
                console.error(e);
                navigate("/error");
            }
        } else if (isMine===true) {
            console.log("내 피드목록 조회")
            try {
                const response = await api.get(`/my/feeds/`, null);
                console.log(response.data)
                if(response.data.success===true){
                    const userFeedList = response.data.data
                    setUserFeeds(userFeedList)
                } else {
                    alert("데이터를 조회하지 못했습니다.");
                }
            } catch (e) {
                console.error(e);
                navigate("/error");
            }
        } else {
            console.log("아직 유저확인이 안됐다!")
        }
    }

    useEffect(() => { 
        // 1. 마이페이지인지 타인인지 확인 후
        userCheck()
        // 2. 유저정보랑 피드목록 불러옴.
        getUsersInfo()
        getUserFeeds()
    }, [userIdx, myIdx, isMine])

    // 회원정보
    const [profile, setProfile] = useState("");
    const [nickname, setNickname] = useState("Mindder...");
    const [followingCount, setFollowingCount] = useState('..');
    const [followerCount, setFollowerCount] = useState('..');
    const [userFeeds, setUserFeeds] = useState([]);
    // 내가 지금보는 유저 팔로우했는지 여부
    const [isFollowing, setIsFollowing] = useState()
    
    return (
        <Wrapper>
            {/* 여기는 유저페이지 */}
            <ProfileContainer>
                <Profile imgsize="m" namesize="m" name={nickname} userIdx={isMine? myIdx : userIdx} imgSrc={profile}></Profile>
                { isMine 
                ?
                <ProfileEditBtn 
                    onClick={() => {
                    navigate("../accounts/edit")
                    }}>
                    <img src={EditBtn}/>
                </ProfileEditBtn>
                :null
                }
                {/* <p>{`나의 페이지 : ${isMine}`}</p> */}
            </ProfileContainer>
            
            {/* isfollowing 팔로잉 여부 넣어주면됨 */}
            <UserFollow isMine={isMine} followerCount={followerCount} followingCount={followingCount} isfollowing={isFollowing}/>
            {isMine?
                <UserMenuSub></UserMenuSub>
                :
                null
            }
            <AlbumWrapper>
                { !userFeeds || userFeeds.length === 0? (
                    <>
                        <span>감정피드가 존재하지 않습니다.</span>
                    </>
                ):(
                <AlbumContainer>
                    {userFeeds.map((recentFeed, idx) => (
                    <CanvasItem size="m" list={recentFeed} up={true} key={idx}></CanvasItem>
                    ))}
                </AlbumContainer>
                )
            }
            </AlbumWrapper>
        </Wrapper>
    );
}

export default UserPage;
