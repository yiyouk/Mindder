import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import api from "../../api/api";

import CrawItem from "../../commons/list/CrawItem";

//영역 타이틀
const Text = styled.div`
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    font-size: 1.1rem;
`

//크롤링 구역
const CrawContainer = styled.div`
    width: 20rem;
    position: absolute;
    bottom: 7vh;
    z-index: 1;
`

//크롤링 영역
const CrawlingsHere = styled.div`
    display: flex;
    justify-content: center;
    height: 8rem;
`

function SearchBook (){
    const navigate = useNavigate();
    const [craw, setCraw] = useState([]);  //책 크롤링 결과

    useEffect(()=>{
        getBook();
    }, []);

    //추천 책 목록 가져오기
    const getBook = async() => { 
        try {
            const response = await api.get(`/searches/books`);    
            if(response.data.success){
                setCraw(response.data.data)
            } 
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
            <CrawContainer>
                <Text>회원님을 위한 추천 도서</Text>
                <CrawlingsHere>
                    {craw.slice(0,3).map((info, index)=>(
                        <CrawItem size="s" imageUrl={info.image} key={index} feedIdx={info.link}/>
                    ))}
                </CrawlingsHere>
            </CrawContainer>
    )
}

export default SearchBook;
