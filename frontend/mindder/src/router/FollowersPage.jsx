// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'

import FollowItem from "../components/user/FollowItem";
import Follower from "../commons/ui/Follower";
import Following from "../commons/ui/Following";

import PrevImg from "../assets/images/back.png"
import { Follow, CountHere } from "../components/user/UserFollow";
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
    /* border:1px solid; */
    display:flex;
    justify-content:center;

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
    const userIdx = useParams().userId;
    const myFollowing = useSelector((state) => state.USER.myFollowing)
    const followerCount = useSelector((state)=>state.USER.followerCount)
    const followingCount = useSelector((state)=>state.USER.followingCount)

    useEffect(() => {
        getFollowerInfo();
    }, [])
    
   
    const getFollowerInfo = async() => {
        try{
            const response = await api.get(`/my/followers/${userIdx}`);
                setFollowerList(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }
    console.log(followerList)

    return (
        <Wrapper>
            <Prev onClick={() => {navigate(`/${userIdx}`);}}/>
            <FollowContainer>
            <Follow>
                <CountHere onClick={()=>{
                    navigate(`/${userIdx}/followers`)
                }}>
                    <span>팔로워</span>
                    <span>{followerCount} </span>
                </CountHere>
                <CountHere onClick={()=>{
                    navigate(`/${userIdx}/following`)
                }}>
                    <span>팔로잉</span>
                    <span>{followingCount} </span>
                </CountHere>
            </Follow>
            </FollowContainer>
                {!followerList || followerList.length === 0? (
                    <div>팔로우 목록이 존재하지 않습니다.</div>
                ):(
                    followerList.map((following, idx) => (
                        <FollowItem userIdx={following.targetUserIdx} status={myFollowing.includes(following.targetUserIdx)} nickname={following.nickname} key={idx} imgSrc={following.base64}></FollowItem>
                    ))
                )}
        </Wrapper>
    );
}

export default FollowersPage;
