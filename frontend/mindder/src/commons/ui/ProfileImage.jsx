// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";


// 임시 user Img
import UserImg from "../../assets/images/CanvasSample.png"


const Wrapper = styled.div`
    margin-right: 30px;
    display: flex;
    align-items: center;
    & > span {
        font-size: 1rem;
        color: #999999;
    }
`;

const ProfileImg = styled.img`
    margin: 0.5rem 1rem 0.5rem 0;
    width: 3rem;
    height: 3rem;
    border: 1px solid #c0c0c0;
    border-radius: 50px;
    /* box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3); */

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
