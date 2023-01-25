// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";


// user
import UserFollow from "./UserFollow";
import UserProfile from "./UserProfile";
import UserFeedsList from "./UserFeedsList";
import UserMenu from "./UserMenu"
import Calendar from "./Calendar";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function UserPage(props) {
    return (
        <Wrapper>
            <UserProfile></UserProfile>
            <UserFollow></UserFollow>
            {/* 내 페이지일 경우 */}
                <UserMenu></UserMenu>
        </Wrapper>
    );
}

export default UserPage;