// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";

// 임시 user Img
import UserImg from "../../assets/images/pro.jpg"


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    & > span {
        font-size: 0.8rem;
        color: rgb(76, 76, 76);
        margin: 0.5rem;
    }
    font-weight: 600;
`;

const ProfileImg = styled.img`
    width: 2.7rem;
    height: 2.7rem;
    border: 1px solid #c0c0c0;
    border-radius: 100%;
    /* box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3); */

`;


function ProfileImage2(props) {
    return (
        <Wrapper>
            <ProfileImg
                src = {UserImg}
            />
            <span>{props.name}</span>
        </Wrapper>
    );
}

export default ProfileImage2;
