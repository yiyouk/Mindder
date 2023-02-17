import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../api/api";

import UserMenuSub from "../components/user/UserMenuSub";
import UserFollow from "../components/user/UserFollow";
import ProfileName from "../commons/ui/ProfileName";
import ProfileImage from "../commons/ui/ProfileImage";

import { AiTwotoneSetting} from "react-icons/ai";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const ProfileContainer = styled.div`
    width: 88vw;
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
`;

export const ProfileContainer2 = styled.div`
    width: 88vw;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Line = styled.div`
    width: 100vw;
    border-bottom: 0.1rem solid #7767FD;
    margin-bottom: 0.2rem;
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
    const navigate = useNavigate();
    // 회원정보
    const [profile, setProfile] = useState("");
    const [nickname, setNickname] = useState("Mindder...");
    const [followingCount, setFollowingCount] = useState('..');
    const [followerCount, setFollowerCount] = useState('..');
    const [userFeeds, setUserFeeds] = useState([]);
    // 내가 지금보는 유저 팔로우했는지 여부
    const [isFollowing, setIsFollowing] = useState();
    // 내껀지 타인껀지 확인.
    const [isMine, setIsMine] = useState();
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state)=>state.USER.myIdx);
    

    useEffect(() => { 
        // 1. 마이페이지인지 타인인지 확인 후
        userCheck()
        // 2. 유저정보랑 피드목록 불러옴.
        getUsersInfo()
        getUserFeeds()
        // return ()=> {userCheck};
    }, [userIdx, myIdx, isMine])
    

    const userCheck = () => {
        if (myIdx && (userIdx == myIdx)){
            setIsMine(true)        
        } else if (myIdx && (userIdx != myIdx)){
            setIsMine(false)
        }
    }

    const getUsersInfo = async() => {

        const response = await api.get(`/my/information/${userIdx}`);
        // console.log(response)
        setNickname(response.data.data.nickname);
        setFollowingCount(response.data.data.followingCount);
        setFollowerCount(response.data.data.followerCount);
        setProfile(response.data.data.base64);
        setIsFollowing(response.data.data.followed)
    }

    //Feed 조회
    async function getUserFeeds(){ 
        if (!isMine){
            //남 피드목록 조회
            try {
                const response = await api.get(`/my/feeds/${userIdx}`);
                if(response.data.success){
                    const userFeedList = response.data.data;
                    setUserFeeds(userFeedList);
                } 
            } catch (e) {
                // console.error(e);
                navigate("/error");
            }
        } else if (isMine) {
            //내 피드목록 조회
            try {
                const response = await api.get(`/my/feeds/`);
                if(response.data.success){
                    const userFeedList = response.data.data;
                    setUserFeeds(userFeedList);
                } 
            } catch (e) {
                // console.error(e);
                navigate("/error");
            }
        } else {
            // console.log("아직 유저확인이 안됐다!")
        }
    }

    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileName userIdx={isMine? myIdx : userIdx} size="l" name={nickname}/>
                <div>
                    { isMine ?
                    <AiTwotoneSetting size="20" color="#7767FD" onClick={() => { navigate("/accounts/edit") }}/> 
                    :null
                    }
                </div>
            </ProfileContainer>
            <ProfileContainer2>
                <ProfileImage size="m" userIdx={isMine? myIdx : userIdx} imgSrc={profile}/>
                <UserFollow isMine={isMine} followerCount={followerCount} followingCount={followingCount} isfollowing={isFollowing}/>
            </ProfileContainer2>
            <Line/>
            <UserMenuSub isMine={isMine} list={userFeeds}></UserMenuSub>
        </Wrapper>
    );
}

export default UserPage;
