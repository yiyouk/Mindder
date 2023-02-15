import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CanvasList from "../../commons/list/CanvasList"

import api from "../../api/api";

function Reco() {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);

  //정보 가져오기
    useEffect(()=>{
        getRecentInfo();
    }, [])

    //최근 포스트 정보
    async function getRecentInfo(){ 
        try {
            const response = await api.get(`/feeds/recommendation`);
            if(response.data.data !== null){
                setFeeds(response.data.data);
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <div> 
            <CanvasList size = "s" up={false} list={feeds.slice(0, 3)}/> 
        </div>
    );
}

export default Reco;
