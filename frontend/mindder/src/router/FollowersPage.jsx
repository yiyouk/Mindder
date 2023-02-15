// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../api/api'

import FollowItem from "../components/user/FollowItem";

import {IoArrowBackCircle} from "react-icons/io5";
import { Line } from "./UserPage";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SAVE_followerCount, } from "../redux/reducers";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper2 = styled.div`
    width: 95vw;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const Follow = styled.div`
    display: flex;
    justify-content:space-around;
    width: 19rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
`

const Text = styled.span`
    font-size: 1rem;
    font-weight: 600;
`

const Text2 = styled.span`
    margin-left: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
`

function FollowersPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const isMine = location.state.status
    const [ pageNickName, setPageNickName ] = useState("");
    const [ followers, setFollowers ] = useState("..");
    const [ followings, setFollowings ] = useState("..");
    const [followerList, setFollowerList] = useState([])
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state) => state.USER.myIdx)

    useEffect(() => {
        getFollowingInfo();
        getFollowerInfo();
        getNickName();
    }, [])

    // 내 팔로워 목록 조회
    const getNickName = async() => {
        try{
            const response = await api.get(`/my/information/${userIdx}`);
            if (response.data.success){
                setPageNickName(response.data.data.nickname);
            }
        } catch (e) {
            console.error(e);
        }
    }
    
    // 내 팔로워 목록 조회
    const getFollowerInfo = async() => {
        try{
            const response = await api.get(`/my/followers/${userIdx}`);
            console.log(response.data)
            if (response.data.success){
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
            console.log(response.data)
            if (response.data.success){
                setFollowings(response.data.data.length);
            }
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
        }
    }

    return (
        <Wrapper>
            <Wrapper2>
                <IoArrowBackCircle size ="33" color="#7767FD" onClick={() => {navigate(`/${userIdx}`);}}/>
                <Text2>{pageNickName}의</Text2>
            </Wrapper2>
            <Follow>
                <Text onClick={()=>{onClick("followers")}}>팔로워 {followers} 명</Text>
                <span onClick={()=>{onClick("following")}}>팔로잉 {followings} 명 </span>
            </Follow>
            <Line/>
            {(!followerList || followerList.length === 0)? 
                <div>팔로우 목록이 존재하지 않습니다.</div>
            :
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
                }
        </Wrapper>
    );
}

export default FollowersPage;
