import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {FaComment, FaHeart} from "react-icons/fa";


const UserFeeds = styled.div`
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
  margin:0.2rem;  
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`
const CanvaConContainer = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 0.1em;
  right: 0.1em;
`

const CanvaImgStyle = styled.img`
  /* width: 300px; */
  object-fit:cover;
  width: 100%;

  @media (max-width: 992x) {
    display: block;
    object-position: 50% 50%;
  }
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

function FeedsListItem({feed}) {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(`/f/${feed.feedIdx}`);
  };

  return(
    <UserFeeds onClick={onClickImg}>
      <CanvaImgStyle src={"data:image/" + feed.extension + ";base64," + feed.base64}/>
      <CanvaConContainer>
        <CanvaConStyle>
          <FaHeart/>
          {feed.likeTotalCount}
        </CanvaConStyle>
        <CanvaConStyle>
          <FaComment/>
          {feed.commentCount}
        </CanvaConStyle>
      </CanvaConContainer>
    </UserFeeds>
  )
}

export default FeedsListItem;