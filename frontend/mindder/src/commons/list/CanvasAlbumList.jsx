import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasItem from "./CanvasItem";


const AlbumWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const AlbumContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* gap: 0.5rem; */
      align-items: center;
      justify-content: center;

    @media (max-width: 992x) {
      width:90vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }
`

function CanvasAlbumList({size, list, up}){
  return (
    <AlbumWrapper>
      <AlbumContainer>
        {list ? list.map((feed, index) => (
          <CanvasItem size={size} list={feed} key={index} up={up}/>   
        )): null}
      </AlbumContainer>
    </AlbumWrapper>  
  );
}

export default CanvasAlbumList;