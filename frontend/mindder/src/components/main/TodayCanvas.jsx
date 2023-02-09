import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TodayCanvasImg from "../../assets/images/TodayCanvas.png"
import api from "../../api/api"
import CanvasItem from "../../commons/list/CanvasItem";

// 오늘의 캔버스
const Container = styled.div`
    margin-top: 0.5rem;
    color: white;
    width: 22rem;
    height: 11rem;
    background-color:#7767FD;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 영역
const Part = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10rem;
`;

//작은 텍스트 영역
const SmallContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-top: 1rem;
`;

//없을때 사진
const InitUser = styled.img`
    background-color: white;
    border-radius: 1rem;
    height: 8.5rem;
    width: 8.5rem;
    margin: 2rem 2rem;
`;

//@@님, 컨버스 기록
const TextHeader = styled.div`
    font-size: 1rem;
`;

//멘트
const Text = styled.div`
    font-size: 0.85rem;
    margin-bottom: 0.1rem;
`;

function TodayCanvas(props) {
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
            console.log(response)
            setEmoteIdx(response.data.data.emoteIdx);
            setEmoteColorTag(response.data.data.emoteColorTag);
            setUpdateDate(response.data.data.updateDate);
            setBase64(response.data.data.base64);
            setExtension(response.data.data.extension);
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <Container>
            {emoteIdx !== null? 
            <>
            <Part>
                <InitUser src={"data:image/" + extension + ";base64," + base64}/>
            </Part>
            <Part>
                <div>
                    <TextHeader>{nickName}님,</TextHeader>
                    <TextHeader>캔버스 기록</TextHeader>
                    <SmallContainer>
                        <Text>{updateDate}</Text>
                        <Text>#{emoteColorTag}</Text>
                        <Text>#{emoteIdx}</Text>
                    </SmallContainer>
                </div>
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
