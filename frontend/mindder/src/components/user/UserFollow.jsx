import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import api from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import Follower from "../../commons/ui/Follower";
import Following from "../../commons/ui/Following";
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

function UserFollow({isMine, follower, following, data}) {
    const navigate = useNavigate();
    const userIdx = parseInt(useParams().userId);
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const followingCount = useSelector((state)=>state.USER.followingCount) 
    const followerCount = useSelector((state)=>state.USER.followerCount) 
    const [ followers, setFollowers ] = useState(0);
    const [ followings, setFollowings ] = useState(0);
    const [ isFollow, setIsFollow ] = useState(data);
    const [ followersCount, setFollowersCount ] = useState();
    const [ followingList, setFollowingList ] = useState([]);

    const followAPI = useCallback(async () => {
        try {
            const response = await api.post(`/my/follows/${userIdx}`);
            setIsFollow((isFollow) => !isFollow);
            console.log(response)
        } catch (e) {
            console.error(e);
        }
      });

    const unFollowAPI = useCallback(async () => {
        try {
            const response = await api.delete(`/my/follows/${userIdx}`);
            setIsFollow((isFollow) => !isFollow);
            console.log(response)
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

    return (
        <Wrapper>
            {isMine?
                <SavedButton onClick={() => {
                    navigate(`/saved`)}}>
                        <img src={BookMarkImg}/>
                </SavedButton>
            :
                <FollowButton  active={isFollow} onClick={handleFollowState} >
                {isFollow? '팔로잉' : '팔로우'}
                </FollowButton>
            }
            <Follow>
                <CountHere onClick={()=>{
                    isMine?
                    navigate(`/${myIdx}/followers`)
                    :
                    navigate(`/${userIdx}/followers`)
                }}>
                    <span>팔로워</span>
                    <span>{followerCount} </span>
                </CountHere>
                <CountHere onClick={()=>{
                    isMine?
                    navigate(`/${myIdx}/following`)
                    :
                    navigate(`/${userIdx}/following`)
                }}>
                    <span>팔로잉</span>
                    <span>{followingCount} </span>
                </CountHere>
            </Follow>
        </Wrapper>
    );
}

export default UserFollow;