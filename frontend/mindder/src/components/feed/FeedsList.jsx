// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import FeedsListItem from "./FeedsListItem";
import styled from "styled-components";


const Wrapper = styled.div`
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const FeedsItemContainer = styled.div`
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
      
    @media (max-width: 992x) {
      width:90vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }
`

function FeedsList({feedsList}) {
    return (
        <Wrapper>
            <FeedsItemContainer>
                {feedsList.map((feed, index) => {
                    // return <CommentListItem getData={getData} commentCount={commentCount} key={index} comment={comment} />;
                    return <FeedsListItem feed={feed} key={index}/>;
                })}
            </FeedsItemContainer>
        </Wrapper>
    );
}

export default FeedsList;
