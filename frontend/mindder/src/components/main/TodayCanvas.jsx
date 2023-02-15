import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Colors16, Emoticons } from "../../redux/reducers";
import styled from "styled-components";

import TodayCanvasImg from "../../assets/images/TodayCanvas.png"
import dayjs from 'dayjs';

import api from "../../api/api"

// 오늘의 캔버스
const Container = styled.div`
    width: 100vw;
    height: 11em;
    display: flex;
    justify-content: center;
    color: white;
    background-color:#7767FD;
    border: none;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
`;

// 영역
const Part = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 9.5rem;
`;

//작은 텍스트 영역
const SmallContainer = styled.div`
    padding-top: 1rem;
`;

//없을때 사진
const InitUser = styled.img`
    background-color: white;
    border: none;
    border-radius: 1rem;
    height: 8.5rem;
    width: 8.5rem;
    margin: 2rem 2rem;
`;

//@@님, 컨버스 기록
const TextHeader = styled.div`
    font-weight: 600;
    font-size: 1rem;
`;

//멘트
const Text = styled.div`
    font-size: 0.9rem;
    margin-bottom: 0.01rem;
`;

function TodayCanvas() {
    const navigate = useNavigate();
    const nickName = useSelector((state)=>state.USER.nickName);
    const [emoteIdx, setEmoteIdx] = useState(0);
    const [emoteColorTag, setEmoteColorTag] = useState(0);
    const [updateDate, setUpdateDate] = useState("");
    const [base64, setBase64] = useState("");
    const [extension, setExtension] = useState("");

  //정보 가져오기
    useEffect(()=>{
        getRecentInfo();
    }, [])

    //최근 포스트 정보
    async function getRecentInfo(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/feeds/recent`);
            if(response.data.data !== null){
                setEmoteIdx(response.data.data.emoteIdx);
                setEmoteColorTag(response.data.data.emoteColorIdx);
                setUpdateDate(response.data.data.updateDate);
                setBase64(response.data.data.base64);
                setExtension(response.data.data.extension);
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <Container>
                {emoteIdx !== 0? 
                <>
                <Part>
                    <InitUser src={"data:image/" + extension + ";base64," + base64}/>
                </Part>
                <Part>
                        <TextHeader>{nickName} 님,</TextHeader>
                        <SmallContainer/>
                        <Text>{dayjs(updateDate).get('y')}년 &nbsp;
                        {dayjs(updateDate).get('M')+1}월 &nbsp;
                        {dayjs(updateDate).get('D')}일
                        </Text>
                        <Text>캔버스 기록</Text>
                        <Text>#{Emoticons[emoteIdx].name} &nbsp;
                        #{Colors16[emoteColorTag].name}</Text>
                </Part>
                </>
                :
                <>
                <Part>
                    <InitUser src={TodayCanvasImg} onClick={() => {navigate("/post")}}/>
                </Part>
                <Part>
                    <TextHeader>{nickName}님,</TextHeader>
                    <SmallContainer>
                        <Text>Mindder에서</Text>
                        <Text>감정을 그려봐요</Text>
                    </SmallContainer>
                </Part>
                </>      
                }
            </Container>
    );
}

export default TodayCanvas;
