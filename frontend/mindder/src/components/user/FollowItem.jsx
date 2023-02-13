import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import api from "../../api/api";
import Profile from '../../commons/ui/Profile';
import FollowButton from '../../commons/ui/FollowButton';

const Wrapper = styled.div`
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.6rem;
`;

// status : true이면 언팔로우, false이면 팔로우
function FollowItem({userIdx, followStatus, nickname, imgSrc, followerCount, followingCount, followChange}) {
    const [followOrUnfollow, setfollowOrUnfollow] = useState(followStatus)
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const [ followingList, setFollowingList ] = useState([]);
    const [ followers, setFollowers ] = useState(".." || followerCount);

    useEffect(()=>{
        myFollowing();
    }, [])

    // 팔로우 여부 확인
    const myFollowing = async() => {
        try{
            const response = await api.get(`/my/followings/${myIdx}`);
            setFollowingList(response.data.data)
        } catch(e) {
            console.error(e)
        }
    }

    const followAPI = useCallback(async () => {
        try {
            const response = await api.post(`/my/follows/${userIdx}`);
            setfollowOrUnfollow((followStatus) => !followStatus);
            setFollowers(followers+1)
        } catch (e) {
            console.error(e);
        }
      });

    const unFollowAPI = useCallback(async () => {
        try {
            const response = await api.delete(`/my/follows/${userIdx}`);
            // console.log(response.data)
            setfollowOrUnfollow((followStatus) => !followStatus);
            setFollowers(followers-1)
        } catch (e) {
            console.error(e);
        }
    })

    const handleFollowState = () => {
        if (followOrUnfollow) {
          unFollowAPI();
          console.log("언팔로우 시도")
          if (followChange){
            followChange(followingCount-1)
          }
        } else {
          followAPI();
          console.log("팔로우 시도")
        if (followChange){
            followChange(followingCount+1)
        }
        }
        
      };
      
    return (
        <Wrapper>
            <Profile imgsize={"s"} namesize={"s"} name={nickname} userIdx={userIdx} imgSrc={imgSrc}/>
            {myIdx === userIdx? 
                <div></div>
                :
                <FollowButton onClick={handleFollowState} active={followOrUnfollow}>
                {followOrUnfollow ? '팔로잉' : '팔로우'}
                </FollowButton>
            }
        </Wrapper>
    );
}

export default FollowItem;
