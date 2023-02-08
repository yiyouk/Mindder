// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../api/api";

import { ProfileContainer } from './UserPage';
import UserMenuSub from "../components/user/UserMenuSub";
import Calendar from "../components/user/Calendar";
import UserFollow from "../components/user/UserFollow";

import Profile from "../commons/ui/Profile";
import EditBtn from "../assets/images/editbtn.png";
import {ProfileEditBtn} from "./UserPage";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function CalendarPage(props) {
    const navigate = useNavigate()

    const [profile, setProfile] = useState("");
    const [nickname, setNickname] = useState("");
    const [following, setFollowing] = useState(0);
    const [follower, setFollower] = useState(0);
    const userIdx = useSelector((state)=>state.USER.myIdx);
    

    // 유저 정보
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
    
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <Wrapper>
            <ProfileContainer>
                <Profile imgsize="m" namesize="m" name={nickname} userIdx={userIdx}></Profile>
                <ProfileEditBtn 
                    onClick={() => {
                    navigate("../accounts/edit")
                }}>
                    <img src={EditBtn}/>
                </ProfileEditBtn>
            </ProfileContainer>
            
            <UserFollow userIdx={userIdx} follower={follower} following={following}></UserFollow>
            <UserMenuSub></UserMenuSub>
            <Calendar></Calendar>
        </Wrapper>
    );
}

export default CalendarPage;
