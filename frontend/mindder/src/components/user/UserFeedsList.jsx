// 추천 캔버스 출력할 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserFeedsItem from "./UserFeedsItem";

const Wrapper = styled.div`
    width: 360px;
    max-width: 720px;
    /* & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    } */
    /* border : 1px solid black; */
    /* background-color:#7767FD; */
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;


const UserFeedsItemContainer = styled.div`
    /* border : 1px solid black; */
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;

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