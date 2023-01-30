import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import searchImg from "../../assets/images/search.png"

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    height:31.5rem;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
`;

const InputContainer = styled.div`
  width:20rem;
  display:flex;
  justify-content:center;
  border-bottom : 1px solid gray;
`

const SearchInput = styled.input`
  width:16rem;
  height:2rem;
  border:1px solid blue;
`

const RecentSearch = styled.div`
  height:20rem;
  /* border:1px solid blue; */
  align-self:flex-start;
`
const RecentHeader = styled.h4`
  position:relative;
  margin-top:0px;
`
const Search = styled.div`
  /* border:1px solid black; */
  width:1.5rem;
  height:1.5rem;
  position:absolute;
  top:5.95rem;
  right:4.4rem;
  background-image:url(${searchImg});
  background-size:cover;
`

function SearchHome (props){
  const [userInput, setUserInput] = useState("")
  const navigate = useNavigate()

  return (
    <Wrapper>
      <InputContainer>
        <SearchInput
        placeholder="검색어를 입력해주세요"
        />
        <Search
        onClick={()=>navigate('/search/:keyword')}
        />
      </InputContainer>
      <RecentSearch>
        <RecentHeader>최근 검색어</RecentHeader>
        {/* <감정태그/> */}
      </RecentSearch>
    </Wrapper>
  )
}

export default SearchHome;