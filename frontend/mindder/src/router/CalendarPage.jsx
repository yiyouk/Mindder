// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

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
    justify-content: flex-start;
`;

function CalendarPage(props) {
    const navigate = useNavigate()
    const userIdx = useSelector((state)=>state.USER.myIdx)
    const profile = useSelector((state)=>state.USER.profileImg)
    const nickname = useSelector((state)=>state.USER.nickName)
    const followerCount = useSelector((state)=>state.USER.followerCount)
    const followingCount = useSelector((state)=>state.USER.followingCount)


    return (
        <Wrapper>
            {/* 여기는 캘린더페이지 */}
            <ProfileContainer>
                <Profile imgsize="m" namesize="m" name={nickname} userIdx={userIdx} imgSrc={profile}></Profile>
                    <ProfileEditBtn 
                        onClick={() => {
                        navigate("../accounts/edit")
                    }}>
                        <img src={EditBtn}/>
                    </ProfileEditBtn>

            </ProfileContainer>
            
            <UserFollow isMine={true} followerCount={followerCount} followingCount={followingCount}/>
            <UserMenuSub/>
            <Calendar/>
        </Wrapper>
    );
}

export default CalendarPage;
