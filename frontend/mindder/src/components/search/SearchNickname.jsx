import React,{useState} from "react";
import styled from "styled-components";
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
        <h1>'검색어'를 포함한 닉네임</h1>
    </Wrapper>
  )
}

export default SearchNickname;