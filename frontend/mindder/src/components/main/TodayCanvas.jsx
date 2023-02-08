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
`;

//없을때 사진
const InitUser = styled.img`
    border-radius: 1rem;
    height: 8.5rem;
    width: 8.5rem;
    margin: 2rem 2rem;
`;

//@@님, 컨버스 기록
const TextHeader = styled.div`
    font-size: 1.2rem;
    padding-bottom: 1rem;
`;

//멘트
const Text = styled.div`
    font-size: 1rem;
    margin-bottom: 0.1rem;
`;

function TodayCanvas(props) {
    const navigate = useNavigate();
    const nickName = useSelector((state)=>state.USER.nickName);
    const [emoteIdx, setEmoteIdx] = useState();
    const [emoteColorTag, setEmoteColorTag] = useState();
    const [updateDate, setUpdateDate] = useState();
    const [list, setList] = useState([]);

  //정보 가져오기
    useEffect(()=>{
        getRecentInfo();
    }, [])

    //최근 포스트 정보
    async function getRecentInfo(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/feeds/recent`);
            setEmoteIdx(response.data.emoteIdx);
            setEmoteColorTag(response.data.emoteColorTag);
            setUpdateDate(response.data.updateDate);
            setList([{
                feedIdx: response.data.feedIdx,
                base64: response.data.base64,
                extension: response.data.extension
            }])
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <Container>
            {updateDate ? 
            <>
            <Part>
                <CanvasItem size="ms" list={list} up={false}/>
            </Part>
            <Part>
                <div>
                    <TextHeader>{nickName}님, 캔버스 기록</TextHeader>
                    <SmallContainer>
                        <Text>{emoteIdx}</Text>
                        <Text>#{emoteColorTag}</Text>
                        <Text>#{updateDate}</Text>
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
