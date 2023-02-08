import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import dayjs from 'dayjs';
import api from "../../api/api"

//emocontainer
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
`;

//emocontainer
const EmoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

const Text  = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
`;

const Date  = styled.div`
    color: #7767FD;
    font-size: 0.7rem;
`;

const Emo  = styled.img`
    width: 2.5rem;
    height: 2.5rem;
`;

function EmotionChart () {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState([]);
    const [month, setMonth] = useState();
    const [day, setDay] = useState();

    //정보 가져오기
    useEffect(()=>{
        console.log("무한르프 무엇?")
        getStatistics();
    }, [])
    
    //최근 포스트 정보
    async function getStatistics(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/statistics`);
            setStatistics(response.data.data);
            console.log(statistics)
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    
  return (
    <>
      <Text> 7일, 마인더들의 최대 감정 표현</Text>
      <Wrapper>
      {statistics.map((info, index) => {
            return(
                <EmoContainer key={index}>  
                    <Date>{dayjs(info.updateDate).get('month')}.{dayjs(info.updateDate).get('date')}</Date>
                    <Emo src={"data:image/" + info.extension + ";base64," + info.base64}></Emo>
                </EmoContainer>
            );
        })}
      </Wrapper>
    </>
  )
}

export default EmotionChart;