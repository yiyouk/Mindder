import React from "react";
import styled, {css} from "styled-components";
import { Colors16 } from "../../redux/reducers";
import loadingGomdol from "../../assets/images/face16.png"

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

function Context({emoteBase64, emoteColorIdx, updateDate, mainText, normalTag}) {
    // var date = new Date(this.HeaderData.createdDate); // 작성시간
    // var now = new Date(); // 현재시간(-9시간 되어있음)
    // this.date = new Date(date.getTime() - date.getTimezoneOffset()*60000) // 현재시간에 9시간 더함
    // let diffTime = (now.getTime() - this.date.getTime())/60000 // 작성시간 - 현재시간 분단위로
    // if(diffTime < 1){ // 1분 이하일경우
    //     this.date = "방금 전"
    // }else if(diffTime < 60) { // 1시간 이하일 경우
    //     this.date = parseInt(diffTime) + "분 전"
    // } else if(diffTime < 1440) { // 24시간 이하일 경우
    //     this.date = parseInt(diffTime/60) + "시간 전"
    // } else if(diffTime < 1440 * 30) { // 한달 이내일 경우
    //     if (parseInt(diffTime/ 1440) == 1){ // 하루 전일경우
    //     this.date = "어제"
    //     } else { // 2일보다 오래된 경우
    //     this.date = parseInt(diffTime/ 1440) + "일 전"
    //     }
    // }

    return (
        <Wrapper>
            <ContextStyled>{mainText}</ContextStyled>
            <Line>
                <TagStyled emoteColorIdx={emoteColorIdx}> {normalTag} #<Tag src={emoteBase64? emoteBase64 : loadingGomdol}/></TagStyled>
            </Line>
            <Date>{updateDate}</Date>
        </Wrapper>
    );
}

export default Context;
