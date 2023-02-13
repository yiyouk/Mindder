import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import api from "../../api/api";

import FollowButton from "../../commons/ui/FollowButton";
import { BsBookmarkFill } from "react-icons/bs";

const Wrapper = styled.div`
    width: 15.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Follow = styled.div`
    display: flex;
    justify-content:space-between;
    width: 6rem;
`

export const CountHere = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Text = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
`
const Text2 = styled.span`
    font-size: 0.9rem;
    color: #707070;
`

const Text3 = styled.span`
    font-size: 0.6rem;
    color: #707070;
    margin-bottom: 0.3rem;
`

function UserFollow({isMine, followerCount, followingCount, isfollowing}) {
    const navigate = useNavigate();
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const [ followers, setFollowers ] = useState(".." || followerCount);
    const [ followings, setFollowings ] = useState(".." || followingCount);
    const [ following, setFollowing ] = useState(".." ||isfollowing);

    useEffect(()=>{
        setFollowing(isfollowing)
        setFollowers(followerCount)
        setFollowings(followingCount)
    },[isfollowing])


    const followAPI = useCallback(async () => {
        try {
            const response = await api.post(`/my/follows/${userIdx}`);
            setFollowing((following) => !following);
            setFollowers(followers+1)
        } catch (e) {
            console.error(e);
        }
      });

    const unFollowAPI = useCallback(async () => {
        try {
            const response = await api.delete(`/my/follows/${userIdx}`);
            setFollowing((following) => !following);
            setFollowers(followers-1)
        } catch (e) {
            console.error(e);
        }
    })
    
    const handleFollowState = () => {
        if (following) {
          unFollowAPI();
        } else {
          followAPI();
        }
    };

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
            {isMine?
            <CountHere>
                <Text3>스크랩</Text3>
                <BsBookmarkFill color="#7767FD" size="20" onClick={() => {navigate(`/saved`)}}/>
            </CountHere>
            :
                <FollowButton  active={following} onClick={handleFollowState} >
                {following? '팔로잉' : '팔로우'}
                </FollowButton>
            }
            <Follow>
                <CountHere onClick={()=>{onClick("followers")}}>
                    <Text2>팔로워</Text2>
                    <Text>{followers} </Text>
                </CountHere>
                <CountHere onClick={()=>{onClick("following")}}>
                    <Text2>팔로잉</Text2>
                    <Text>{followings} </Text>
                </CountHere>
            </Follow>
        </Wrapper>
    );
}

export default UserFollow;