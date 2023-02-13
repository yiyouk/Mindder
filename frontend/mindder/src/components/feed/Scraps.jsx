import React, { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

function Scraps({myScrap, feedIdx}) {
  const navigate = useNavigate();
  const [scrap, setScrap] = useState(myScrap);

 // 정보 가져오기
  useEffect(()=>{
    setScrap(myScrap);
  }, [myScrap])

  //스크랩등록
  const scrapRegister = async() => {
    try {
      console.log(feedIdx)
      const response = await api.post(`/scraps/${feedIdx}`);
      
      if(response.data.success){
        setScrap(!scrap);
        console.log(response);
      }
      
    } catch (e) {
      console.error(e);
      navigate("/error");
    }
  }

  //스크랩 삭제
  const scrapDelete = async() => {
    console.log(feedIdx)
    try {
      const response = await api.delete(`/scraps/${feedIdx}`);
      if(response.data.success){
        setScrap(!scrap);
        console.log(response);
      }
    } catch (e) {
      console.error(e);
      navigate("/error");
    }
  }



  return (
    <div>
        {scrap ? <BsBookmarkFill onClick={scrapDelete}  size="20" color="#7767FD"/> : <BsBookmark onClick={scrapRegister} size="20" color="#7767FD"/>}
    </div>

  );
};

export default Scraps;