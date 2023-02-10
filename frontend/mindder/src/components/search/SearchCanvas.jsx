import React,{useState} from "react";
import styled from "styled-components";

import api from "../../api/api"

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


function SearchCanvas ({result}){
  // const navigate = useNavigate()
    
  
  //태그에 맞는 결과 보여주기
    // const searchUsers = async(result) => {
    //     if(keyword.length >= 1){
    //         try {
    //             const response = await api.get(`/searches/users/${keyword}`); 
    //             if(response.data.success){
    //                 setNickNameRes(response.data.data);
    //                 setKind(false);
    //             } 
    //             console.log(response.data.data)
                
    //         } catch (e) {
    //             console.error(e);
    //             navigate("/error");
    //         }
    //     } else {
    //         setNickNameRes([]);
    //     }
    // }
  return (
    <Wrapper>

    </Wrapper>
  )
}

export default SearchCanvas;