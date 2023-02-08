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
import { SAVE_followerCount, } from "../redux/reducers";

const Wrapper = styled.div`
    /* padding: 16px; */
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
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
    const dispatch = useDispatch()
    const followingList = useSelector((state)=>state.USER.followingList)
    const [followerList, setFollowerList] = useState([])
    const [followingListState, setFollowingListState] = useState(followingList)
    const userIdx = useParams().userId;
    const myIdx = useSelector((state) => state.USER.myIdx)
    const followingCount = useSelector((state)=>state.USER.followingCount)

    useEffect(() => {
        setFollowingListState(followingList)
        getFollowerInfo();
    }, [])

    // 내 팔로워 목록 조회
    const getFollowerInfo = async() => {
        try{
            const response = await api.get(`/my/followers/${userIdx}`);
            console.log(response.data)
            setFollowerList(response.data.data);
            dispatch(SAVE_followerCount(response.data.data.length))
            console.log(response.data.data.length)
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
                    <span>{followerList.length || "..."} </span>
                </CountHere>
                <CountHere onClick={()=>{
                    navigate(`/${userIdx}/following`)
                }}>
                    <span>팔로잉</span>
                    <span>{followingListState.length} </span>
                </CountHere>
            </Follow>
            </FollowContainer>
                {!followerList || followerList.length === 0? (
                    <div>팔로우 목록이 존재하지 않습니다.</div>
                ):(
                    followerList.map((myFollower, idx) => (
                        <FollowItem userIdx={myFollower.userIdx} followStatus={followingListState.includes(myFollower.userIdx)} nickname={myFollower.nickname} key={idx} imgSrc={myFollower.base64}></FollowItem>
                    ))
                )}
        </Wrapper>
    );
}

export default FollowersPage;
