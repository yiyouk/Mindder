// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import SearchNickname from "../components/search/SearchNickname";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function SearchNamePage(props) {
    return (
        <Wrapper>
            <SearchNickname/>
        </Wrapper>
    );
}

export default SearchNamePage;
