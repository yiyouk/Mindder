// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";

import ScrapFeedsList from "../components/user/ScrapFeedsList";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function SavedPage(props) {
    return (
        <Wrapper>
            <ScrapFeedsList></ScrapFeedsList>
        </Wrapper>
    );
}

export default SavedPage;
