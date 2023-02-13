import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {IoAlertCircle} from "react-icons/io5";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.div`
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #606060;
`;

  //검색 글자 한줄
const Container = styled.div`
    width: 20rem;
    padding-bottom: 1rem;
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
`

function SearchNickname ({keyword, result}){
  const navigate = useNavigate()

  return (
    <Wrapper>
    {result.length === 0 ?
      <>
        <IoAlertCircle color="#7767FD" size="100" style={{padding:'1rem'}}/>
        <Text>검색어를 포함한</Text>
        <Text>사용자가 없습니다.</Text>
      </>
      :
      <>
        <Text>'{keyword}'를 포함한 닉네임</Text>
        {result.map((info, index) => {
            return(
              <Container key={index} onClick={()=> navigate(`/${info.userIdx}`)}>
                    {info.nickname}
              </Container>
            )
        })}
      </>
    }
    </Wrapper>
  )
}

export default SearchNickname;