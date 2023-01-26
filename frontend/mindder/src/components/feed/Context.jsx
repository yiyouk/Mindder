import React from "react";
import styled from "styled-components";
import Imgs from "../../assets/images/face1.png";

const Wrapper = styled.div`
    width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: solid 0.6px rgb(231, 231, 231);
    /* box-shadow: 1px 0px 0px rgb(67, 67, 67); */
`;

const ContextWrapper = styled.div`
    width: 19em;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
`;

const ContextStyled = styled.div`
    size: 0.8rem;
    font-weight: 500;
    align-items: start;
    margin-bottom: 0.5rem;
`;

const TagStyled = styled.div`
    size: 0.9rem;
    font-weight: 500;
    align-items: start;
    margin-bottom: 0.5rem;
`;

const Img = styled.div`
    width: 1.6em;
    height: 1.6rem;
    background-image:url(${Imgs});
    background-size:cover;
`

const Date = styled.div`
    width: 21em;
    display: flex;
    font-size: 0.9rem;
    color: rgb(67, 67, 67);
    justify-content: flex-end !important;
    margin-bottom: 0.5rem;
`

function Context(props) {
    return (
        <Wrapper>
            <ContextWrapper>
                <Img></Img>
                <ContextStyled>&nbsp; 오늘은 좀 슬퍼이 </ContextStyled>
            </ContextWrapper>
            <Date>2022.01.26</Date>
            {/* <ContextWrapper>
                <TagStyled>#슬픔 #레드</TagStyled>
            </ContextWrapper> */}
        </Wrapper>
    );
}

export default Context;
