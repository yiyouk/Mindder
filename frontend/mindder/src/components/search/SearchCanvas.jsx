import React,{useState} from "react";
import styled from "styled-components";
import { ContentsContainer, UsersContainer } from "./SearchResult";
import { HeaderBtnContainer } from "./SearchResult";
import { Header } from "./SearchResult";
import BackIcon from "../../assets/images/back.png";
import FollowItem from "../user/FollowItem";
import { useNavigate } from "react-router-dom";
import { CanvasContainer } from "./SearchResult";
import CanvasItem from "../../commons/list/CanvasItem";
import FeedRecoDetail from "../feed/FeedRecoDetail";

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    height:31.5rem;
    display: grid;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    /* border:1px solid blue; */
`;


function SearchCanvas (props){
  const navigate = useNavigate()
  
  return (
    <Wrapper>
      <CanvasContainer>
        <HeaderBtnContainer>
          <Header>'검색어' 태그를 포함한 캔버스</Header>
          <button type="button" className="img_btn"
          onClick={()=>{
            navigate("/search/사랑")
          }}
          ><img id = "back_btn" src={BackIcon}/></button>
        </HeaderBtnContainer>
        <FeedRecoDetail></FeedRecoDetail>
      </CanvasContainer>
    </Wrapper>
  )
}

export default SearchCanvas;