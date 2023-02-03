import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// user
import UserMenuSub from "./UserMenuSub"

import Follower from "../../commons/ui/Follower"
import Following from "../../commons/ui/Following"


import ProfileImage from "../../commons/ui/ProfileImage";
import ProfileName from "../../commons/ui/ProfileName";
import MenuBtn from "../../assets/images/menulistbtn.png";



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: start;
    padding-left: 1.2rem;
`;
export const ProfileEditBtn = styled.div`
    width: 30px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    position:relative;
    left:6rem;
`;

const FollowContainer = styled.div`
    display: flex;
    align-items:center;
`;

function UserMenu({userIdx}) {
    const navigate = useNavigate();

    // 내 유저 아이디
    const selectedUserId = useSelector((state)=>state.USER.userIdx)

    const [profile, setProfile] = useState("");
    const [nickname, setNickname] = useState("");
    const [following, setFollowing] = useState(0);
    const [follower, setFollower] = useState(0);

    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async() => {
        console.log(userIdx)
        try{
            const response = await api.get(`/my/information/${userIdx}`);
                setNickname(response.data.data.nickname);
                setFollowing(response.data.data.followingCount);
                setFollower(response.data.data.followerCount);
                setProfile(response.data.data.fileIdx);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileImage size="m"></ProfileImage>
                <ProfileName size="m" name={nickname}></ProfileName>
                { userIdx === selectedUserId? 
                    <ProfileEditBtn 
                        onClick={() => {
                        navigate("../accounts/edit")
                        }}>
                        <img src={MenuBtn}/>
                    </ProfileEditBtn>
                    : null
                }
            </ProfileContainer>
            <FollowContainer>
                <Follower follower={follower} userIdx={userIdx}></Follower>
                <Following following={following} userIdx={userIdx}></Following>
            </FollowContainer>

            { userIdx === selectedUserId? 
                <UserMenuSub></UserMenuSub>
                : null
            }
        </Wrapper>
    );
}

export default UserMenu;