// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import api from "../api/api";
import { SAVE_otherUserIdx } from "../redux/reducers";
import { SAVE_followingList } from "../redux/reducers";

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
    margin-left: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
`

function UserPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const exProfile = useSelector((state)=>state.USER.profileImg)
    const exNickname = useSelector((state)=>state.USER.nickName)
    const followwerCount = useSelector((state)=>state.USER.followerCount)
    const followingCount = useSelector((state)=>state.USER.followingCount)

    // 회원정보
    const [profile, setProfile] = useState(""||exProfile);
    const [nickname, setNickname] = useState(""||exNickname);
    const [following, setFollowing] = useState(0||followingCount);
    const [follower, setFollower] = useState(0||followwerCount);
    const [userFeeds, setUserFeeds] = useState([]);

    // 로그인 되어 있는 유저의 팔로잉 정보
    const myFollow = useSelector((state)=>state.USER.myFollowing)
    
    // 유저 아이디
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state)=>state.USER.myIdx);

    // const [isFollow, setIsFollow] = useState(myFollow.includes(userIdx));
    const [isMine, setIsMine] = useState(Boolean(userIdx===myIdx))

    useEffect(() => {
        setIsMine(Boolean(userIdx===myIdx))
        setProfile(exProfile)
        setNickname(exNickname)
        setFollower(followwerCount)
        setFollowing(followingCount)
        myFollowing();
        // getUserId();
        // getOthersInfo();
        // getUserFeeds();
    }, [myIdx])
    console.log(follower,following)
    

    // 로그인 되어 있는 유저의 팔로잉 정보 저장
    const myFollowing = async () => {
        try {
            const response = await api.get(`/my/followings/${myIdx}`);
            const followList = response.data.data.map((a) => a.targetUserIdx);
            console.log(followList)
            dispatch(SAVE_followingList(followList))
        } catch (e) {
            console.error(e);
        }
    }; 
    
    // 'myIdx'와 'userIdx' 비교 (같으면? otherUserIdx => null로 / 다르면? otherUseridx에 userIdx 저장)
    const getUserId = () => {
        if(userIdx !== myIdx){
            console.log(userIdx, myIdx)
            dispatch(SAVE_otherUserIdx(userIdx))
        } else if(userIdx === myIdx) {
            dispatch(SAVE_otherUserIdx(null))
        }
    }

    // 유저 정보 (닉네임, 팔로잉수, 팔로워수, 프로필이미지)
    const getOthersInfo = async() => {
        const response = await api.get(`/my/information/${userIdx}`);
        console.log(response)
            setNickname(response.data.data.nickname);
            setFollowing(response.data.data.followingCount);
            setFollower(response.data.data.followerCount);
            setProfile(response.data.data.base64);
    }


    // 피드 요청
    async function getUserFeeds(){ // async, await을 사용하는 경우
        if (userIdx !== myIdx){
            console.log("타인의 피드입니다")
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
        } else {
            console.log("내 피드입니다.")
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
        }
    }


    
    return (
        <Wrapper>
            {/* 여기는 유저페이지 */}
            <ProfileContainer>
                <Profile imgsize="m" namesize="m" name={nickname} userIdx={isMine? myIdx : userIdx} imgSrc={profile}></Profile>
                { isMine ?
                    <ProfileEditBtn 
                        onClick={() => {
                        navigate("../accounts/edit")
                    }}>
                        <img src={EditBtn}/>
                    </ProfileEditBtn>
                    :null
                }
            </ProfileContainer>
            
            <UserFollow isMine={isMine} followerCount={follower} followingCount={following}/>
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
