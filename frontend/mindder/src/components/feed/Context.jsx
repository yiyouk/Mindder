import React from "react";
import styled, {css} from "styled-components";
import { Colors16 } from "../../redux/reducers";

const colortyles = css`
  /*크기*/
  ${({myLikeType}) => css`
    color: ${Colors16[myLikeType].code};
  `}
`;

const Wrapper = styled.div`
    width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: solid 0.6px rgb(231, 231, 231);
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
`;

const ContextStyled = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.1rem;
`;

const TagStyled = styled.div`
    ${colortyles}
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

const Date = styled.div`
    color: gray;
    font-size: 0.75rem;
`

function Context({myLikeType, updateDate, mainText, normalTag}) {
    return (
        <Wrapper>
            <ContextStyled>{mainText}</ContextStyled>
            <TagStyled myLikeType={myLikeType}> {normalTag} </TagStyled>
            <Date>{updateDate}</Date>
        </Wrapper>
    );
}

export default Context;
