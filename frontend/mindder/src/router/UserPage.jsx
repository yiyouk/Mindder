// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import UserMenu from "../components/user/UserMenu";
import CanvasAlbumList from "../commons/list/CanvasAlbumList";
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
            {/* 여기는 유저페이지 */}
            <UserMenu></UserMenu>
            {/* <UserFeedsList></UserFeedsList> */}
            <CanvasAlbumList></CanvasAlbumList>
            
        </Wrapper>
    );
}

export default UserPage;
