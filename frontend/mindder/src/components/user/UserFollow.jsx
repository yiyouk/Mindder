import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import api from "../../api/api";
import { useSelector, useDispatch } from "react-redux";

import FollowButton from "../../commons/ui/FollowButton";
import BookMarkImg from "../../assets/images/bookmark.png"
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div`
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 1.6rem;
    border-bottom: 2px solid #7767FD;

`;

const SavedButton = styled.div`
    align-self: center;
    margin: 7px;
    border-width: 1px;
    cursor: pointer;
`;

export const Follow = styled.div`
    display: flex;
    justify-content:space-between;
    width:7rem;
    /* border:1px solid; */
`

export const CountHere = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
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
                <SavedButton onClick={() => {
                    navigate(`/saved`)}}>
                        <img src={BookMarkImg}/>
                </SavedButton>
            :
                <FollowButton  active={following} onClick={handleFollowState} >
                {following? '언팔로우' : '팔로우'}
                </FollowButton>
            }
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
        </Wrapper>
    );
}

export default UserFollow;