import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import styled from 'styled-components';
import api from "../../api/api";
import FollowButton from '../../commons/ui/FollowButton';
import Profile from '../../commons/ui/Profile';
import ProfileImage from '../../commons/ui/ProfileImage';
import ProfileName from '../../commons/ui/ProfileName';
import { ProfileContainer } from '../../router/UserPage';

const Wrapper = styled.div`
    /* padding: 16px; */
    box-sizing: content-box;
    /* width: calc(100% - 40px); */
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.9rem;
`;


function FollowItem({userIdx, status, nickname, imgSrc}) {
    const [isFollow, setIsFollow] = useState({status})
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const [ followingList, setFollowingList ] = useState([]);


    useEffect(()=>{
        myFollowing();
    }, [isFollow])


    // 팔로우 여부 확인
    const myFollowing = async() => {
        try{
            const response = await api.get(`/my/followings/${myIdx}`);
            setFollowingList(response.data.data)
            console.log(response.data)
            {
                Object.keys(followingList).find(key => followingList[key].targetUserIdx === {userIdx})?
                    setIsFollow(true)
                    : 
                    setIsFollow(false)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const followAPI = useCallback(async () => {
        try {
            const response = await api.post(`/my/follows/${userIdx}`);
            setIsFollow((isFollow) => !isFollow);
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
      });

    const unFollowAPI = useCallback(async () => {
        try {
            const response = await api.delete(`/my/follows/${userIdx}`);
            setIsFollow((isFollow) => !isFollow);
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
    })
    const handleFollowState = () => {
        if (isFollow) {
          unFollowAPI();
        } else {
          followAPI();
        }
      };
    console.log(status)
    return (
        <Wrapper>

            <ProfileContainer>
                <Profile imgsize={"s"} namesize={"s"} name={nickname} userIdx={userIdx} imgSrc={imgSrc}/>
            </ProfileContainer>
            {myIdx === userIdx? 
                null:
                <FollowButton onClick={handleFollowState} active={status}>
                {status ? '팔로잉' : '팔로우'}
                </FollowButton>
            }
        </Wrapper>
    );
}

export default FollowItem;
