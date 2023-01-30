import React,{useState} from "react";
import styled from "styled-components";
import { UsersContainer } from "./SearchResult";
import { HeaderBtnContainer } from "./SearchResult";
import { Header } from "./SearchResult";
import BackIcon from "../../assets/images/back.png";
import FollowItem from "../user/FollowItem";
import { useNavigate } from "react-router-dom";

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


function SearchNickname (props){
  const navigate = useNavigate()

  return (
    <Wrapper>
      <UsersContainer>
        <HeaderBtnContainer>
          <Header>'검색어'를 포함한 닉네임</Header>
          <button type="button" className="img_btn"
          onClick={()=>{
            navigate("/search/:keyword")
          }}
          ><img id = "back_btn" src={BackIcon}/></button>
        </HeaderBtnContainer>
          <FollowItem/>
          <FollowItem/>
          <FollowItem/>
      </UsersContainer>
    </Wrapper>
  )
}

export default SearchNickname;