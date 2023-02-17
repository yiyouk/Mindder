import React from "react";
import styled  from "styled-components";

import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const M = styled.div`
    margin-right: 0.7rem;
`;

function Profile({imgsize, namesize, name, userIdx, imgSrc}) {
    // // console.log(imgSrc)
    return (
        <Wrapper>
            <ProfileImage userIdx={userIdx} size={imgsize} imgSrc={imgSrc}/>
            <M/>
            <ProfileName userIdx={userIdx} size={namesize} name={name}></ProfileName>
        </Wrapper>
    );
}

export default Profile;
