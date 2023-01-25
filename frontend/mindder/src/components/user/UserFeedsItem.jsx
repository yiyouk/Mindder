import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasSample from "../../assets/images/CanvasSample.png"

const UserFeeds = styled.div`
  background-color: black;  
  margin:10px;
  width: 160px;
  height: 160px;
  left: 183px;
  top: 252px;
  background-image:url(${CanvasSample});
  background-size:cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
`

const ContentStyle = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: end;
`

function UserFeedsItem(props) {
  return(
    <UserFeeds>
      <ContentStyle>
        <div>
          감정표현 수 
          
        </div>
        <div>
          댓글 수
        </div>
      </ContentStyle>
    </UserFeeds>
  )
}

export default UserFeedsItem;