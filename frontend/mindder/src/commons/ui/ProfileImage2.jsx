// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";


// 임시 user Img
import UserImg from "../../assets/images/face1.png"


const Wrapper = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    & > span {
        font-size: 0.9rem;
        color: rgb(111, 111, 111);
    }
    font-weight: 600;
`;

const ProfileImg = styled.img`
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
`;


function ProfileImage(props) {
    return (
        <Wrapper>
            <ProfileImg
                src = {UserImg}
            />
            <span>{props.name}</span>
        </Wrapper>
    );
}

export default ProfileImage;
