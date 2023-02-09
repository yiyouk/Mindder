import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Colors16, Emoticons } from "../../redux/reducers";
import styled from "styled-components";

import dayjs from 'dayjs';
import api from "../../api/api"

//emocontainer
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 20.5rem;
    height: 7rem;
    background-color:  #f1efff;
    border-top-left-radius: 1rem;
    border-top-right-radius: 2rem;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1rem;
`;

//emocontainer
const EmoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
`;

const Text  = styled.div`
    width: 19.5rem;
    display: flex;
    margin-top: 0.4rem;
    justify-content: flex-end;
    font-size: 0.4rem;
`;

const Date  = styled.div`
    color: #2e2e2e;
    font-size: 0.65rem;
`;

const Date2  = styled.div`
    color: #31259f;
    font-size: 0.65rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
`;

const Emo  = styled.img`
    width: 2rem;
    height: 2rem;
`;

function EmotionChart () {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState([]);

    const yo = [{
        name:"일"
    }, {
        name:"월"
    },{
        name:"화"
    },{
        name:"수"
    },{
        name:"목"
    },{
        name:"금"
    },{
        name:"토"
    }]

    //정보 가져오기
    useEffect(()=>{
        getStatistics();
        return () => setStatistics([]);
    }, [])
    
    //최근 포스트 정보
    async function getStatistics(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/statistics`);
            if(response.data.data !== null){
                setStatistics(response.data.data);
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    
  return (
    <div>
        <Wrapper>
        {statistics.length===0 ? null : statistics.map((info, index) => {
            return(
                <EmoContainer key={index}>
                        <Date2>{dayjs(info.updateDate).get('month')+1}.{dayjs(info.updateDate).get('date')}({yo[dayjs(info.updateDate).get('day')].name})</Date2>
                        <Emo src={"data:image/" + info.extension + ";base64," + info.base64}></Emo>
                        <Date>#{Emoticons[info.emoteIdx].name}</Date>
                        <Date>#{Colors16[info.emoteColorIdx].name}</Date>
                    </EmoContainer>
                );
            })}
        </Wrapper>
        <Text> 7일 간의 마인더 최대 감정 태그</Text>
    </div>
  )
}

export default EmotionChart;