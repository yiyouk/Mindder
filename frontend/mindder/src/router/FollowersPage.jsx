// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'

import FollowItem from "../components/user/FollowItem";

import PrevImg from "../assets/images/back.png"
import { Follow, CountHere } from "../components/user/UserFollow";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SAVE_followerCount, } from "../redux/reducers";
import { useLocation } from "react-router-dom";

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
    const location = useLocation()
    const isMine = location.state.status
    const [ followers, setFollowers ] = useState("..");
    const [ followings, setFollowings ] = useState("..");
    const [followerList, setFollowerList] = useState([])
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state) => state.USER.myIdx)

    useEffect(() => {
        getFollowingInfo();
        getFollowerInfo();
    }, [])

    // 내 팔로워 목록 조회
    const getFollowerInfo = async() => {
        try{
            const response = await api.get(`/my/followers/${userIdx}`);
            // console.log(response.data)
            if (response.data){
                setFollowerList(response.data.data);
                setFollowers(response.data.data.length)
                dispatch(SAVE_followerCount(response.data.data.length))
            }
        } catch (e) {
            console.error(e);
        }
    }
    
    const getFollowingInfo = async() => {
        try{
            const response = await api.get(`/my/followings/${userIdx}`);
            // console.log(response.data)
            setFollowings(response.data.data.length);
        } catch (e) {
            console.error(e);
        }
    }

    const onClick = (path) => {
        if (isMine) {
            navigate(`/${myIdx}/${path}`, {state:{
                status:isMine, followerCount:followers, followingCount:followings}}) 
        } else {
            navigate(`/${userIdx}/${path}`, {state:{status:isMine,followerCount:followers, followingCount:followings}})
        }
    }

    const handleFollowChange = (followCount)=>{
        console.log(isMine)
        if (isMine){
            setFollowings(followCount)
            console.log(`현재보고있는유저 팔로잉 수 : ${followCount}`)
        }
    }

    return (
        <Wrapper>
            <Prev onClick={() => {navigate(`/${userIdx}`);}}/>
            <FollowContainer>
            <Follow>
                <CountHere onClick={()=>{onClick("followers")}}>
                    <span>팔로워</span>
                    <span>{followers} </span>
                </CountHere>
                <CountHere onClick={()=>{onClick("following")}}>
                    <span>팔로잉</span>
                    <span>{followings} </span>
                </CountHere>
            </Follow>
            </FollowContainer>
                {!followerList || followerList.length === 0? (
                    <div>팔로우 목록이 존재하지 않습니다.</div>
                ):(
                    followerList.map((myFollower, idx) => (
                        <FollowItem 
                        userIdx={myFollower.userIdx} 
                        followStatus={myFollower.followed} 
                        nickname={myFollower.nickname} 
                        imgSrc={myFollower.base64}
                        followChange={handleFollowChange}
                        followingCount={followings}
                        key={idx} 
                        />
                    ))
                )}
        </Wrapper>
    );
}

export default FollowersPage;
