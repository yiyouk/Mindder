// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import Follow from "../components/user/Follow";
import FollowItem from "../components/user/FollowItem";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function FollowersPage(props) {
    return (
        <Wrapper>
            여기는 팔로워페이지
            <Follow></Follow>
            <FollowItem></FollowItem>
        </Wrapper>
    );
}

export default FollowersPage;
