// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {IoArrowBackCircle} from "react-icons/io5";

import ScrapFeedsList from "../components/user/ScrapFeedsList";

const Wrapper = styled.div`
    /* padding: 16px; */
    width: 100vw;
    display: flex;
    flex-direction: column;
    /* border: 1px solid blue; */

`;
const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
`;

const ScrapContainer = styled.div`
    display: flex;
    justify-content: center;
`

function SavedPage(props) {
    
  const navigate = useNavigate();
    return (
        <Wrapper>
            <BtnContainer>
                <IoArrowBackCircle color="#7767FD" size="40" onClick={() => navigate(-1)}/>
            </BtnContainer>
            <ScrapContainer>
                <ScrapFeedsList/>
            </ScrapContainer>
        </Wrapper>
    );
}

export default SavedPage;
