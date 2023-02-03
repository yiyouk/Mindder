// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";


// user
import UserFollow from "./UserFollow";
import UserMenuSub from "./UserMenuSub"


import ProfileImage from "../../commons/ui/ProfileImage";
import ProfileName from "../../commons/ui/ProfileName";

import MenuBtn from "../../assets/images/menulistbtn.png";
const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: start;
    padding-left: 1.2rem;
`
export const ProfileEditBtn = styled.div`
    width: 30px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    position:relative;
    left:6rem;
`

function UserPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileImage size="m"></ProfileImage>
                <ProfileName size="m" name="닉네임"></ProfileName>
                <ProfileEditBtn 
                    onClick={() => {
                    navigate("../accounts/edit")
                    }}>
                    <img src={MenuBtn}/>
                </ProfileEditBtn>
            </ProfileContainer>
            <UserFollow></UserFollow>
            {/* 내 페이지일 경우 */}
                <UserMenuSub></UserMenuSub>
        </Wrapper>
    );
}

export default UserPage;