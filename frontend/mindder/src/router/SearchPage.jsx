import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import api from "../api/api";

import SearchNickname from "../components/search/SearchNickname";
import SearchCanvas from "../components/search/SearchCanvas";
import SearchBook from "../components/search/SearchBook";
import ErrorPage from "./ErrorPage";

import { IoArrowBackCircle } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";

const Wrapper = styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

//영역 타이틀
const Text = styled.div`
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    font-size: 1.1rem;
`

const InputContainer = styled.div`
  width: 22rem;
  display:flex;
  justify-content:center;
  border-bottom : 0.1rem solid #7767FD;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const SearchInput = styled.input`
  width: 17rem;
  height: 2rem;
  border: solid 0.1rem #7767FD;
  background-color: #ffffff;
  margin-right: 0.5rem;
  `

//검색 결과 창 전체
const ResultContainer = styled.div`
    background-color: white;
    margin-top: 0.5rem;
    width: 21rem;
`
//검색 결과 창 전체
const Line = styled.div`
    width: 22rem;
    padding-bottom: 1rem;
    background-color: white;
    border-bottom: solid 0.1rem #7767FD;
`
//검색 글자 한줄
const Container = styled.div`
    width: 20rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: black;
    font-weight: 600;
    font-size: 1rem;
    `

function SearchPage (){
    const navigate = useNavigate()
    const [alert, setAlert ] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [level, setLevel] = useState(0); //검색창 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(false); //true은 키워드, false은 닉네임
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

    //유저 검색하기
    const searchUsers = async(keyword) => {
        setKind(false);
        if(keyword.length >= 1){
            try {
                const response = await api.get(`/searches/users/${keyword}`); 
                if(response.data.success){
                    setNickNameRes(response.data.data);
                }  
            } catch (e) {
                // console.error(e);
                navigate("/error");
            }
        } else {
            setNickNameRes([]);
        }
    }

    //노말태그 검색하기
    const searchHash = async(keyword) => { 
        setKind(true);
        if(keyword.length >= 2){
            try {
                const response = await api.get(`/searches/hash/%23${keyword.substr(1)}`);    
                if(response.data.success){
                    setTagRes(response.data.data);
                } 
            } catch (e) {
                // console.error(e);
                navigate("/error");
            }
        } else{
            setTagRes([]);
        }
    }

    const checkTage = (e) => {
        setKeyword(e);
        setLevel(level+1);
    }

    if(level === 0){
        return (
            <Wrapper>
            <InputContainer>
                <SearchInput value={keyword} type="text" placeholder="검색어를 입력해주세요" onChange={handleKeyword}/>
                <BiSearch color="#7767FD" size="30" onClick={()=>setLevel(level+1)}/>
            </InputContainer>
            <>
                {kind ?
                (tagRes.length === 0 ?
                <>
                    <ResultContainer>
                        <Text> 검색 결과 없음 </Text> 
                        <div> 검색시, 닉네임 검색</div>
                        <div> # 검색시, 해당 태그를 포함하는 게시글 검색 가능</div>
                    </ResultContainer>
                </>
                :
                <>
                    <ResultContainer>
                        <Text> 검색 결과</Text>
                        {tagRes.map((info, index) => {
                            return(
                            <Container key={index} onClick={()=>checkTage(info)}>
                                {info}
                            </Container>
                            )
                        })}  
                    </ResultContainer>
                    <Line/> 
                </>
                )
                :
                (nickNameRes.length ===0 ?
                <>
                    <ResultContainer>
                        <Text> 검색 결과 없음 </Text> 
                        <div> 검색시, 닉네임 검색</div>
                        <div> # 검색시, 해당 태그를 포함하는 게시글 검색 가능</div>
                    </ResultContainer>
                </>
                :
                <>
                    <ResultContainer>
                        <Text> 검색 결과</Text>
                        {nickNameRes.map((info, index) => {
                            return(
                            <Container key={index} onClick={()=> navigate(`/${info.userIdx}`)}>
                                {info.nickname}
                            </Container>
                            )
                        })}
                    </ResultContainer>
                    <Line/>
                </>
                )
                }
            </>
            <SearchBook/>
        </Wrapper>
        );
    } else if(level === 1) {
        return (
            <Wrapper>
                <Container>
                    <IoArrowBackCircle color="#7767FD" size="40" onClick={()=>setLevel(level-1)}/>
                </Container>
                { kind ?
                    <SearchCanvas keyword={keyword}/>
                    :
                    <SearchNickname keyword={keyword} result={nickNameRes}/>
                }
            </Wrapper>
        );
    }else{
        <ErrorPage></ErrorPage>
    }
}

export default SearchPage;
