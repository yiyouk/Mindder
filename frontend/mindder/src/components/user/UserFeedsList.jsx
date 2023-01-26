// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserFeedsItem from "./UserFeedsItem";


const Wrapper = styled.div`
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const UserFeedsItemContainer = styled.div`
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
      
    /* border : 1px solid black; */

    @media (max-width: 992x) {
      width:90vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }
`

function UserFeedsList(props){
  return (
    <Wrapper>
      <UserFeedsItemContainer>
        {/* 여기서 for문 */}
          <UserFeedsItem/>
          <UserFeedsItem/> 
          <UserFeedsItem/> 
          <UserFeedsItem/>
          <UserFeedsItem/>
          <UserFeedsItem/>
          <UserFeedsItem/>
          <UserFeedsItem/>
          <UserFeedsItem/>
          <UserFeedsItem/>
      </UserFeedsItemContainer>
    </Wrapper>  
  );
}

export default UserFeedsList;