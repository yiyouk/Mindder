import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import api from "../api/api";

import SearchNickname from "../components/search/SearchNickname";
import SearchCanvas from "../components/search/SearchCanvas";
import ErrorPage from "./ErrorPage";

import { IoArrowBackCircle } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";


const Wrapper = styled.div`
    padding-top: 1rem;
    height: 70vh;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
  width: 22rem;
  display:flex;
  justify-content:center;
  border-bottom : 0.1rem solid #7767FD;
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  width: 17rem;
  height: 2rem;
  border: solid 0.1rem #7767FD;
  background-color: #ffffff;
  margin-right: 0.5rem;
  `

const RecentSearch = styled.div`
  height: 20rem;
  align-self:flex-start;
  `
const RecentHeader = styled.span`
    font-size: 1rem;
    font-weight: 600;
`

//누르면 나오는거
const DropDown = styled.div`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

//박스 전체 컨테이너
const ListContainer = styled.div`
  background-color: white;
  width: 20rem;
  height: 28rem;
  overflow-y: scroll;
  border-radius: 0.5rem;
  position: absolute;
  display:none;
  ${DropDown}:active & {
      display: block;
    }
    ${DropDown}:focus & {
        display: block;
  }
  display: flex;
  flex-direction: column;
  padding: 1rem;
  `;

  //검색 글자 한줄
  const Container = styled.div`
    width: 20rem;
    padding-bottom: 0.7rem;
    color: black;
    font-weight: 600;
    font-size: 1.1rem;
`

function SearchPage (props){
    const navigate = useNavigate()
    const [alert, setAlert ] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [recent, setRecent] = useState("")
    const [level, setLevel] = useState(0); //검색창 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(true); //true은 키워드, false은 닉네임
    const [tagRes, setTagRes] = useState([]);  //일반 태크 검색 결과
    const [nickNameRes, setNickNameRes] = useState([]);  //닉네임 컴색 결과

    //0.02초마다 실행되도록
    useEffect(()=>{
        setAlert(false)
        const timer = setInterval(() => setAlert(true), 20);
        return ()=>{setTimeout(() => {clearInterval(timer); setAlert(false);}, 20);}
    }, [keyword]);

    //닉네임 입력중
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
        if(alert){
            if(e.target.value[0]==="#"){ //해시태크 검색중
                searchHash(e.target.value);
            }else{ //유저 검색중..
                searchUsers(e.target.value);
            }
        }
    }

    //최근 검색어 가져오기
    // const getRecentSearches = async() => { 
    //     try {
    //         const response = await api.get(`/searches/recent`);    

    //         if(response.data.success){
    //             setNeighborFeeds(response.data.data.Feeds)
    //         } else {
    //             alert("이웃 피드를 조회하지 못했습니다.");
    //         }
    //     } catch (e) {
    //         console.error(e);
    //         navigate("/error");
    //     }
    // }

    //유저 검색하기
    const searchUsers = async(keyword) => {
        if(keyword.length >= 1){
            try {
                const response = await api.get(`/searches/users/${keyword}`); 
                if(response.data.success){
                    setNickNameRes(response.data.data);
                    setKind(false);
                } 
                console.log(response.data.data) 
            } catch (e) {
                console.error(e);
                navigate("/error");
            }
        } else {
            setNickNameRes([]);
        }
    }

    //노말태그 검색하기
    const searchHash = async(keyword) => { 
        if(keyword.length >= 2){
            try {
                const response = await api.get(`/searches/hash/%23${keyword.substr(1)}`);    
    
                if(response.data.success){
                    setTagRes(response.data.data);
                    setKind(true);
                } 
                console.log(response.data.data)
            } catch (e) {
                console.error(e);
                navigate("/error");
            }
        } else{
            setTagRes([]);
        }
    }

    if(level === 0){
        return (
            <Wrapper>
            <DropDown>
            <InputContainer>
                <SearchInput value={keyword} type="text" placeholder="검색어를 입력해주세요" onChange={handleKeyword}/>
                <BiSearch color="#7767FD" size="30" onClick={()=>setLevel(level+1)}/>
            </InputContainer>
            <ListContainer>
                {kind ?
                (tagRes.length === 0 ?
                    null :
                <>
                      {tagRes.map((info, index) => {
                        return(
                        <Container key={index} onClick={()=>setLevel(level+1)}>
                            {info}
                        </Container>
                        )
                    })}      
                </>
                )
                :
                (nickNameRes.length ===0 ?
                    null :
                <>
                    {nickNameRes.map((info, index) => {
                        return(
                        <Container key={index} onClick={()=> navigate(`/${info.userIdx}`)}>
                            {info.nickname}
                        </Container>
                        )
                    })}
                </>
                )
                }
            </ListContainer>
            </DropDown>
            <RecentSearch>
            <RecentHeader>최근 검색어</RecentHeader>
            {/* <감정태그/> */}
            </RecentSearch>
        </Wrapper>
        );
    } else if(level === 1) {
        return (
            <>
                <IoArrowBackCircle color="#7767FD" size="40" onClick={()=>setLevel(level-1)}/>
                { kind ?
                <SearchCanvas result={tagRes}/>:
                <SearchNickname result={nickNameRes}/>
                }
            </>
        );
    }else{
        <ErrorPage></ErrorPage>
    }
}

export default SearchPage;
