import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CanvasAlbumList from "../../commons/list/CanvasAlbumList"
import styled from "styled-components";

import api from "../../api/api"

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

function SearchCanvas ({keyword}){
  const navigate = useNavigate()
  const [result, setResult] = useState([]);
  //정보 가져오기
  useEffect(()=>{
    searchCanvas();
  }, [keyword])

  const searchCanvas = async() => {
    try {
      // console.log(keyword)
      const response = await api.get(`/feeds/searches/%23${keyword.substr(1)}`);
      // console.log(response)
      if (response.data.success){
          setResult(response.data.data);
      }  
    } catch (e) {
        // console.error(e);
        navigate("/error");
    }
  }

  return (
    <Wrapper>
          {result.length === 0 ?
      <>
        <IoAlertCircle color="#7767FD" size="100" style={{padding:'1rem'}}/>
        <Text>검색어 태그를 포함한</Text>
        <Text>게시글이 없습니다.</Text>
      </>
      :
      <>
          <Text>'{keyword}' 태그를 포함한 게시글</Text>
          <CanvasAlbumList size="m" list={result} up={true}/>
      </>
    }
    </Wrapper>
  )
}

export default SearchCanvas;