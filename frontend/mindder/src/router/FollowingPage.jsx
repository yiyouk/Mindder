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

    const [followerList, setFollowerList] = useState([])
    const [followingList, setFollowingList] = useState([])

    const userIdx = useParams().userId;
    const myFollowing = useSelector((state) => state.USER.myFollowing)
    
    useEffect(() => {
        getFollowerInfo();
        getFollowingInfo();
    }, [])
    

    // // 팔로워 리스트 받아옴
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
                {!followingList || followingList.length === 0? (
                    <div>팔로우 목록이 존재하지 않습니다.</div>
                ):(
                    followingList.map((following, idx) => (
                        <FollowItem userIdx={following.targetUserIdx} status={myFollowing.includes(following.targetUserIdx)} data={following} key={idx}></FollowItem>
                    ))
                )}
        </Wrapper>
    );
}

export default FollowingPage;
