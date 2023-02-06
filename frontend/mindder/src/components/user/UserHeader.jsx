import React from "react";
import styled from "styled-components";
import { ProfileContainer, ProfileEditBtn } from "../../router/UserPage_test";
import UserFollow from "./UserFollow";

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

const Follow = styled.div`
    display: flex;
    justify-content: end;
`

function UserHeader(props){
    const isMe = props.isMe

    if (isMe){
        return (
            <>
                <ProfileContainer>
                <Profile imgsize="m" namesize="m" name={nickname} userIdx={userIdx}/>
                    <ProfileEditBtn 
                    onClick={() => {
                        navigate("../accounts/edit")
                    }}>
                    <img src={EditBtn}/>
                    </ProfileEditBtn>
                </ProfileContainer>
                <Wrapper>
                    <SavedButton onClick={() => {
                        navigate(`/saved`)}}>
                            <img src={BookMarkImg}/>
                    </SavedButton>               
                    <Follow>
                    <Follower userIdx={userIdx} follower={follower} following={following}/> 
                    <Following userIdx={userIdx} follower={follower} following={following}/>
                    </Follow>
                </Wrapper>
            </> 
        )
    } else {
        return (
            <>
            <ProfileContainer>
            <Profile imgsize="m" namesize="m" name={nickname} userIdx={userIdx}/>
            </ProfileContainer>
            <Wrapper>
                <FollowButton  active={isFollow} onClick={handleFollowState} >
                {isFollow? '팔로잉' : '팔로우'}
                </FollowButton>
                    
                <Follow>
                <Follower userIdx={userIdx} follower={follower} following={following}/> 
                <Following userIdx={userIdx} follower={follower} following={following}/>
                </Follow>
            </Wrapper>
        </> 
        )
    }
}

export default UserHeader;