// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";


// 임시 user Img
import UserImg from "../../assets/images/face01.PNG"


const Wrapper = styled.div`
    margin-right: 30px;
    display: flex;
    align-items: center;
    & > span {
        font-size: 1rem;
        color: grey;
    }
`;

const ProfileImg = styled.img`
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;

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
