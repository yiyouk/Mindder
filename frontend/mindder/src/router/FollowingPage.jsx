// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import api from '../api/api'

import { Line } from "./UserPage";
import FollowItem from "../components/user/FollowItem";
import {IoArrowBackCircle} from "react-icons/io5";

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

function FollowingPage(props) {
    // useNavigate에서 state로 넘긴 데이터를 받아준다.
    const navigate = useNavigate();
    const location = useLocation();
    const isMine = location.state.status? location.state.status : ''
    const followerCount = useSelector((state)=>state.USER.followerCount)
    const [ pageNickName, setPageNickName ] = useState("");
    const [ followings, setFollowings ] = useState("..");
    const [followingList, setFollowingList] = useState([])
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state) => state.USER.myIdx)
    
    useEffect(() => {
        getFollowingInfo();
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
    
    // 내가 팔로잉하는 리스트 받아옴
    const getFollowingInfo = async() => {
        try{
            const response = await api.get(`/my/followings/${userIdx}`);
            console.log(response.data)
            setFollowingList(response.data.data);
            setFollowings(response.data.data.length)
        } catch (e) {
            console.error(e);
        }
    }
    // console.log(followingList)

    const onClick = (path) => {
        if (isMine) {
            navigate(`/${myIdx}/${path}`, {state:{
                status:isMine, followerCount:followerCount, followingCount:followings}}) 
        } else {
            navigate(`/${userIdx}/${path}`, {state:{status:isMine,followerCount:followerCount, followingCount:followings}})
        }
    }

    const handleFollowChange = (followCount)=>{
        if (isMine){
            setFollowings(followCount)
            console.log(followCount)
        }
    }

    return (
        <Wrapper>
            <Wrapper2>
                <IoArrowBackCircle size ="33" color="#7767FD" onClick={() => {navigate(`/${userIdx}`);}}/>
                <Text2>{pageNickName}의</Text2>
            </Wrapper2>
            <Follow>
                <span onClick={()=>{onClick("followers")}}>팔로워 {followerCount} 명</span>
                <Text onClick={()=>{onClick("following")}}>팔로잉 {followings} 명 </Text>
            </Follow>
            <Line/>
            {(!followingList || followingList.length === 0) ? 
                <div>팔로잉 목록이 존재하지 않습니다.</div>
            :
                followingList.map((following, idx) => (
                    <FollowItem 
                        userIdx={following.targetUserIdx} 
                        followStatus={true} 
                        nickname={following.nickname} 
                        imgSrc={following.base64}
                        followerCount={followerCount}
                        followChange={handleFollowChange}
                        followingCount={followings}
                        key={idx} 
                    />
                ))
            }
        </Wrapper>
    );
}

export default FollowingPage;
