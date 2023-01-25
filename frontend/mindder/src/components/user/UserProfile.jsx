import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// commons
import ProfileImage from "../../commons/ui/ProfileImage";
import MenuBtn from "../../assets/images/menulistbtn.png";

const Wrapper = styled.div`
    /* padding: 16px; */
    box-sizing: content-box;
    padding: 30px 20px 0;
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ProfileEditBtn = styled.div`
    width: 30px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;

`

function UserProfile(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <ProfileImage name="닉네임"/>

            {/* 유저아이디가 나 일 경우 보이는 버튼 */}
            <ProfileEditBtn 
                onClick={() => {
                navigate("../accounts/edit")
            }}>
                <img src={MenuBtn}/>
            </ProfileEditBtn>

        </Wrapper>
    );
}

export default UserProfile;