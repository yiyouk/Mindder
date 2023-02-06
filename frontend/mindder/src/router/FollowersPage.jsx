// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'

import FollowItem from "../components/user/FollowItem";
import Follower from "../commons/ui/Follower";
import Following from "../commons/ui/Following";

import PrevImg from "../assets/images/back.png"

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FollowContainer = styled.div`
    width: 100%;
    display: flex;
    border-top: 2px solid #7767FD;
    & > * {
        width: 50%;
    }

`

export const Prev = styled.div`
align-self: flex-start;
    width: 42px;
    height: 42px;
    border: none;
    background-image:url(${PrevImg});
    background-size: 55%;
    background-position:center;
    background-position-x:8px;
    background-repeat: no-repeat;
    cursor: pointer;
`

function FollowersPage() {
    const navigate = useNavigate();

    const [followerList, setFollowerList] = useState([])
    const [followingList, setFollowingList] = useState([])

    const userIdx = useParams().userId;
    const myFollowing = useSelector((state) => state.USER.myFollowing)


    useEffect(() => {
        getFollowerInfo();
        getFollowingInfo();
    }, [])
    
   
    const getFollowerInfo = async() => {
        try{
            const response = await api.get(`/my/followers/${userIdx}`);
                setFollowerList(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }

    // 팔로잉 리스트 받아옴
    const getFollowingInfo = async() => {
        try{
            const response = await api.get(`/my/followings/${userIdx}`);
                setFollowingList(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Wrapper>
            <Prev onClick={() => {navigate(`/${userIdx}`);}}/>
            <FollowContainer>
                <Follower userIdx={userIdx} follower={followerList.length}/>
                <Following userIdx={userIdx} following={followingList.length}/>
            </FollowContainer>
                {!followerList || followerList.length === 0? (
                    <div>팔로우 목록이 존재하지 않습니다.</div>
                ):(
                    followerList.map((follower, idx) => (
                        <FollowItem userIdx={follower.userIdx} status={myFollowing.includes(follower.userIdx)} data={follower} key={idx}></FollowItem>
                    ))
                )}
        </Wrapper>
    );
}

export default FollowersPage;
