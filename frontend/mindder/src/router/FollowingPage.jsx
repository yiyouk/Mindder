// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'
import FollowMenu from "../components/user/FollowMenu";
import FollowItem from "../components/user/FollowItem";
import Follower from "../commons/ui/Follower";
import Following from "../commons/ui/Following";
import { FollowContainer } from "./FollowersPage";
import {Prev} from "./FollowersPage";
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

function FollowingPage(props) {
    const navigate = useNavigate();
    const [followingList, setFollowingList] = useState([])

    const userIdx = parseInt(useParams().userId);
    const myFollowing = useSelector((state) => state.USER.myFollowing)
    const followerCount = useSelector((state)=>state.USER.followerCount)
    const followingCount = useSelector((state)=>state.USER.followingCount)
    useEffect(() => {
        getFollowingInfo();
    }, [])
    

    // 팔로잉 리스트 받아옴
    const getFollowingInfo = async() => {
        try{
            const response = await api.get(`/my/followings/${userIdx}`);
            console.log(response.data)
            setFollowingList(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }

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
                {!followingList || followingList.length === 0? (
                    <div>팔로잉 목록이 존재하지 않습니다.</div>
                ):(
                    followingList.map((following, idx) => (
                        <FollowItem userIdx={following.targetUserIdx} status={myFollowing.includes(following.targetUserIdx)} nickname={following.nickname} key={idx} imgSrc={following.base64}></FollowItem>
                    ))
                )}
        </Wrapper>
    );
}

export default FollowingPage;
