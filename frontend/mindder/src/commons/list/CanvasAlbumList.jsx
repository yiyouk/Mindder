import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CanvasItem from "./CanvasItem";


const AlbumWrapper = styled.div`
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const AlbumContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.7rem;
      align-items: center;
      justify-content: center;
      
    /* border : 1px solid black; */

    @media (max-width: 992x) {
      width:90vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }
`

function CanvasAlbumList(props){
  const [feedList, setFeedList] = useState([])
  useEffect(() => {
    console.log("피드데이터", props)
    // setFeedList(feedlist)
}, [])
  return (
    <AlbumWrapper>
      <AlbumContainer>
        {/* 여기서 for문 */}
        {feedList.map((Feed, idx) => (
          <CanvasItem size="m" feedIdx={Feed.feedIdx} imageUrl={Feed.fildIdx} commentCount={Feed.commentCount} likeTotalCount={Feed.likeTotalCount} key={idx}/>   

        ))}
      </AlbumContainer>
    </AlbumWrapper>  
  );
}

export default CanvasAlbumList;