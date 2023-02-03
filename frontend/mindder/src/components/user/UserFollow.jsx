import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";

import Follower from "../../commons/ui/Follower";
import Following from "../../commons/ui/Following";
import BookMarkImg from "../../assets/images/bookmark.png"
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 1.6rem;
    border-bottom: 2px solid #7767FD;

`;

const SavedButton = styled.div`
    align-self: end;
    margin: 7px;
    border-width: 1px;
    cursor: pointer;
`;


function UserFollow({userIdx}) {
    const navigate = useNavigate();
    const [ followers, setFollowers ] = useState(0);
    const [ followings, setFollowings ] = useState(0);

    
    useEffect(() => {
        console.log('팔로우..')
        console.log(userIdx)
        // getUserFollow();
    }, [])
    
    // const getUserFollow = async() => {
    //     try{
    //         const response = await ap
    //     }
    // }
    return (
        <Wrapper>
            {/* 유저가 나 일 경우 보이는 버튼 */}
                <SavedButton onClick={() => {
                    navigate("../0/saved")}}>
                        <img src={BookMarkImg}/>
                </SavedButton>
            {/* 유저가 다른 사람일 경우 보이는 버튼 */}
                {/* <FollowButton/> */}
            <Follower /> 
            <Following />
            
        </Wrapper>
    );
}

export default UserFollow;