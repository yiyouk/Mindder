import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CanvasList from "../../commons/list/CanvasList"

import api from "../../api/api";

function Reco() {
    const navigate = useNavigate();
    const postNum = useSelector((state)=>state.USER.postNum);
    const [feeds, setFeeds] = useState([]);

  //정보 가져오기
    useEffect(()=>{
        getRecentInfo();
    }, [postNum])

    //최근 포스트 정보
    async function getRecentInfo(){ 
        try {
            const response = await api.get(`/feeds/recommendation`);
            if(response.data.data !== null){
                setFeeds(response.data.data);
            }
        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }

    return (
        <> 
            <CanvasList size = "s" up={false} list={feeds.slice(0, 3)}/> 
        </>
    );
}

export default Reco;
