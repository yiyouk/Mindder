import React from "react";
import styled, {css} from "styled-components";
import { Colors16, Emoticons } from "../../redux/reducers";
import Image from "react-image-webp";

const colortyles = css`
  /*크기*/
  ${({emoteColorIdx}) => css`
    color: ${Colors16[emoteColorIdx].code};
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
    /* margin-bottom: 0.5rem; */
`;

const Date = styled.div`
    color: gray;
    font-size: 0.75rem;
`

const Line = styled.div`
    margin-bottom: 0.5rem;  
    display: flex;
`

function Context({emoteIdx, emoteColorIdx, updateDate, mainText, normalTag}) {
    const bear= require(`../../assets/images/mindder_bear/${Emoticons[emoteIdx].name}/${Colors16[emoteColorIdx].name}.webp`)

    return (
        <Wrapper>
            <ContextStyled>{mainText}</ContextStyled>
            <Line>
                <TagStyled emoteColorIdx={emoteColorIdx}> {normalTag} #</TagStyled>
                <Image webp={bear}  style={{width:"1.5rem"}}/>
            </Line>
            <Date>{updateDate}</Date>
        </Wrapper>
    );
}

export default Context;
