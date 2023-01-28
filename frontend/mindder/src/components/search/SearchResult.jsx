import React,{useState} from "react";
import styled from "styled-components";
import PlusIcon from "../../assets/images/icon5.png";
import BackIcon from "../../assets/images/back.png";
import "../../assets/css/main.css";
import CanvasItem from "../../commons/list/CanvasItem";
import FollowItem from "../user/FollowItem";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    /* height:rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
    `;

const HeaderContainer = styled.div`
  width:20rem;
  height:3rem;
  display:flex;
  margin-left:-2rem;
  `
const RecommendContainer = styled.div`
  width:20rem;
  height:10rem;
  `

export const ContentsContainer = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  
  `

const RecoContents = styled.div`
  width:5rem;
  height:6rem;
  border : 1px solid gray;
  
  `

export const HeaderBtnContainer = styled.div`
  /* border:1px solid green; */
  display:flex;
  align-items:center;
  /* justify-content:center; */
  `

export const Header = styled.h5`
  position:relative;
  margin-top:1rem;
  /* border:1px solid black; */
  `

export const CanvasContainer = styled.div`
  width:20rem;
  height:10rem;
  `

export const UsersContainer = styled.div`
  width:20rem;
  height:15rem;

  `



function SearchResult (props){
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeaderContainer>
        <button type="button" className="img_btn"
        onClick={()=>{
          navigate("/search")
        }}
        ><img id = "back_btn" src={BackIcon}/></button>
        <p>검색어</p>
      </HeaderContainer>
      <RecommendContainer>
        <Header>회원님을 위한 추천 콘텐츠</Header>
        <ContentsContainer>
          <RecoContents/>
          <RecoContents/>
          <RecoContents/>
        </ContentsContainer>
      </RecommendContainer>
      <CanvasContainer>
        <HeaderBtnContainer>
          <Header>'검색어' 태그를 포함한 캔버스</Header>
          <button type="button" className="img_btn"
            onClick={()=>{
              navigate("/search/사랑/canvas")
            }}
          ><img  src={PlusIcon}/></button>
        </HeaderBtnContainer>
        <ContentsContainer>
          <CanvasItem/>
          <CanvasItem/>
          <CanvasItem/>
        </ContentsContainer>
      </CanvasContainer>
      <UsersContainer>
        <HeaderBtnContainer>
          <Header>'검색어'를 포함한 닉네임</Header>
          <button type="button" className="img_btn"
          onClick={()=>{
            navigate("/search/사랑/nickname")
          }}
          ><img  src={PlusIcon}/></button>
        </HeaderBtnContainer>
          <FollowItem/>
          <FollowItem/>
          <FollowItem/>
      </UsersContainer>
    </Wrapper>
  )
}

export default SearchResult;