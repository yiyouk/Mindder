import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import api from "../../api/api";
import FollowButton from '../../commons/ui/FollowButton';
import Profile from '../../commons/ui/Profile';
import ProfileImage from '../../commons/ui/ProfileImage';
import ProfileName from '../../commons/ui/ProfileName';
import { SAVE_followingCount } from '../../redux/reducers';
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

// status : true이면 언팔로우, false이면 팔로우
function FollowItem({userIdx, followStatus, nickname, imgSrc}) {
    const [followOrUnfollow, setfollowOrUnfollow] = useState(followStatus)
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const [ followingList, setFollowingList ] = useState([]);
    const dispatch = useDispatch()
    const followingCount = useSelector((state)=>state.USER.followingCount)
    const followCount = useSelector((state)=>state.USER.followCount)

    useEffect(()=>{
        myFollowing();
    }, [])

    // 팔로우 여부 확인
    const myFollowing = async() => {
        try{
            const response = await api.get(`/my/followings/${myIdx}`);
            setFollowingList(response.data.data)
            // console.log(response.data.data)
            // {
            //     Object.keys(followingList).find(key => followingList[key].targetUserIdx === {userIdx})?
            //         setfollowOrUnfollow(true)
            //         : 
            //         setfollowOrUnfollow(false)
            // }
        } catch(e) {
            console.error(e)
        }
    }

    const followAPI = useCallback(async () => {
        try {
            const response = await api.post(`/my/follows/${userIdx}`);
            setfollowOrUnfollow((followOrUnfollow) => !followOrUnfollow);
             
            dispatch(SAVE_followingCount(followingCount-1))
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
      });

    const unFollowAPI = useCallback(async () => {
        try {
            const response = await api.delete(`/my/follows/${userIdx}`);
            setfollowOrUnfollow((followOrUnfollow) => !followOrUnfollow);
            dispatch(SAVE_followingCount(followingCount+1))
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
    })

    const handleFollowState = () => {
        if (followOrUnfollow) {
          unFollowAPI();
          console.log("언팔로우 시도")
        } else {
          followAPI();
          console.log("팔로우 시도")
        }

      };
      
    return (
        <Wrapper>

            <ProfileContainer>
                <Profile imgsize={"s"} namesize={"s"} name={nickname} userIdx={userIdx} imgSrc={imgSrc}/>
            </ProfileContainer>
            {myIdx === userIdx? 
                null:
                <FollowButton onClick={handleFollowState} active={followOrUnfollow}>
                {followOrUnfollow ? '언팔로우' : '팔로우'}
                </FollowButton>
            }
        </Wrapper>
    );
}

export default FollowItem;
