// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'
import FollowItem from "../components/user/FollowItem";
import { FollowContainer } from "./FollowersPage";
import {Prev} from "./FollowersPage";
import { Follow, CountHere } from "../components/user/UserFollow";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SAVE_followingCount, SAVE_followingList } from "../redux/reducers";
import { useLocation } from "react-router-dom";


const Wrapper = styled.div`
    /* padding: 16px; */
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    /* border: 1px solid; */
`;

function FollowingPage(props) {
    // useNavigate에서 state로 넘긴 데이터를 받아준다.
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const isMine = location.state.status? location.state.status : ''
    const followingCount = useSelector((state)=>state.USER.followingCount)
    const followerCount = useSelector((state)=>state.USER.followerCount)
    console.log(location.state)
    const [ followers, setFollowers ] = useState(".." || followerCount);
    const [ followings, setFollowings ] = useState(".." || followingCount);
    const [followingList, setFollowingList] = useState([])
    // const [isMine, setIsMine] = useState()
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state) => state.USER.myIdx)

    useEffect(() => {
        // setIsMine(ismine)
        setFollowers(followerCount)
        setFollowings(followingCount)
        getFollowingInfo();
    }, [location])

    // 내가 팔로잉하는 리스트 받아옴
    const getFollowingInfo = async() => {
        try{
            const response = await api.get(`/my/followings/${userIdx}`);
            console.log(response.data)
            setFollowingList(response.data.data);
            dispatch(SAVE_followingCount(response.data.data.length))
        } catch (e) {
            console.error(e);
        }
    }
    // console.log(followingList)

    const onClick = (path) => {
        if (isMine) {
            navigate(`/${myIdx}/${path}`, {state:{
                status:isMine, followerCount:followers, followingCount:followings}}) 
        } else {
            navigate(`/${userIdx}/${path}`, {state:{status:isMine,followerCount:followers, followingCount:followings}})
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
                {!followingList || followingList.length === 0? (
                    <div>팔로잉 목록이 존재하지 않습니다.</div>
                ):(
                    followingList.map((following, idx) => (
                        <FollowItem 
                        userIdx={following.targetUserIdx} 
                        followStatus={true} 
                        nickname={following.nickname} 
                        imgSrc={following.base64}
                        followerCount={followers}
                        followingCount={followings}
                        key={idx} 
                        />
                    ))
                )}
        </Wrapper>
    );
}

export default FollowingPage;
