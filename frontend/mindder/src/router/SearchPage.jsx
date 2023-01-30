// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import SearchHome from "../components/search/SearchHome";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function SearchPage(props) {
    return (
        <Wrapper>
            <SearchHome/>
        </Wrapper>
    );
}

export default SearchPage;
