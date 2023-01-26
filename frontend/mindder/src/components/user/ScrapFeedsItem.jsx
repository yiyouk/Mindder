import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasSample from "../../assets/images/CanvasSample.png"

import LikeIcon from "../../assets/images/Logo.png"
import CommentIcon from "../../assets/images/comment.png"

import ProfileImage from "../../commons/ui/ProfileImage"

const Wrapper = styled.div`
      margin: 0.5rem 0 0.25rem 0.5rem;

`

const UserFeeds = styled.div`
  /* width: 200px; */
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
  margin:0.2rem;  
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
  `

  const CanvaImgStyle = styled.img`
    /* width: 300px; */
    object-fit:cover;
    width: 100%;
  
    @media (max-width: 992x) {
      display: block;
      object-position: 100%;
    }
    `

const CanvaConContainer = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 0.1em;
  right: 0.1em;
`


const CanvaConStyle = styled.div`
  width: 100%; 
  display: flex;
  align-items: center;
  color: grey;
  margin: 0.5em;
  & > img{
    width: 1.2em;
    margin-right: 0.2em;
  }
`


function UserFeedsItem(props) {
  const navigate = useNavigate();
  const idx = 0
  const onClickImg = () => {
    navigate(`/f/${idx}`);
  };

  return(
    <Wrapper>
      <ProfileImage name="닉네임"/>
      <UserFeeds onClick={onClickImg}>
        <CanvaImgStyle src={CanvasSample}/>
        <CanvaConContainer>
          <CanvaConStyle>
            <img src={LikeIcon} alt="감정표현수" />
            188
          </CanvaConStyle>
          <CanvaConStyle>
            <img src={CommentIcon} alt="댓글수" />
            50
          </CanvaConStyle>
        </CanvaConContainer>
    </UserFeeds>
    </Wrapper>
  )
}

export default UserFeedsItem;