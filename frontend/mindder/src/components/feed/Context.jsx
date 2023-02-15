import React from "react";
import styled, {css} from "styled-components";
import { Colors16 } from "../../redux/reducers";

const colortyles = css`
  ${({emoteColorIdx}) => css`
    color: ${Colors16[emoteColorIdx].code};
  `}
`;

const Wrapper = styled.div`
    width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    display: flex;
    align-items: center;
`;

const Date = styled.div`
    color: gray;
    font-size: 0.75rem;
`

const Line = styled.div`
    margin-bottom: 0.5rem;  
    display: flex;
`

const Tag = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`

function Context({emoteBase64, emoteIdx, emoteColorIdx, updateDate, mainText, normalTag}) {
    return (
        <Wrapper>
            <ContextStyled>{mainText}</ContextStyled>
            <Line>
                <TagStyled emoteColorIdx={emoteColorIdx}> {normalTag} #<Tag src={emoteBase64}/></TagStyled>
            </Line>
            <Date>{updateDate}</Date>
        </Wrapper>
    );
}

export default Context;
