import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import styled from "styled-components";

import CanvasAlbumList from "../commons/list/CanvasAlbumList";
import CanvasList from "../commons/list/CanvasList"
import ErrorPage from "./ErrorPage";

import api from "../api/api";

import "../assets/css/main.css";
import blank from "../assets/images/blank.png";
import {FiPlusCircle} from "react-icons/fi";
import {IoArrowBackCircle} from "react-icons/io5";

const Wrapper = styled.div`
    /* margin: 3rem 0 0 0; */
    /* border:1px solid; */
`;

const Box = styled.div`
    width: 22rem;
    height: 9rem;
`;

const Dum = styled.img`
    padding: 0 1rem;
    width: 19rem;
    height: 8rem;
`;


const Container = styled.div`
    display: flex;
    color: rgb(67, 67, 67);
    font-weight: 600;
    margin: 2rem 0 0.8rem 0;
`  

const Comment = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0.3rem 0 1rem 0;
`  

/////////////////////////컴포넌트 시작///////////////////////////////
function FeedsPage() {
    const navigate = useNavigate()
    const [level, setLevel] = useState(0); //목록 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(1); //종류
    
    useEffect(()=>{
        getRealtimeFeeds()
        getPopularFeeds();
        getNeighborFeeds();
        setLevel(0);
    }, [])

    //컴포넌트 바꿔치기
    const onClick = (id) => {
        setLevel(level+1);
        setKind(id);
    }

    //헌재 사용 유저 idx 꺼내기                         
    const nickName = useSelector((state)=>state.USER.nickName)
    const [realtimeFeeds, setRealtimeFeeds] = useState([])
    const [popularFeeds, setPopularFeeds] = useState([])
    const [neighborFeeds, setNeighborFeeds] = useState([])

    //실시간 피드 가져오기
    const getRealtimeFeeds = async() => { 
        try {
            const response = await api.get(`/feeds/realtime-feed`);

            if (response.data.success){
                setRealtimeFeeds(response.data.data.Feeds);
            } else {
                alert("실시간 피드를 조회하지 못했습니다.");
            }

        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }


    //인기 피드 가져오기
    const getPopularFeeds = async() => { 
        try {
            const response = await api.get(`/feeds/popular-feed`);
            
            if (response.data.success){
                setPopularFeeds(response.data.data.Feeds)
            } else {
                alert("인기 피드를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    //이웃 데이터 피드 가져오기
    const getNeighborFeeds = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/neighbors`);    

            if(response.data.success){
                setNeighborFeeds(response.data.data.Feeds)
            } else {
                alert("이웃 피드를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    const recentFeedsList = [
        {
            id: 0,
            comment: "최근, 공유된 캔버스 ",
            comment2: "Loading...",
            data: realtimeFeeds,
        },
        {
            id: 1,
            comment: '최근, 마인더 인기 캔버스',
            comment2: "Loading...",
            data: popularFeeds
        },
        {
            id: 2,
            comment: `최근, ${nickName}님의 이웃이 공유했어요`,
            comment2: `${nickName}님! 새로운 이웃을 추가해봐요!`,
            data: neighborFeeds
        }
    ];
    
    if(level === 0){
        return (
            <Wrapper>   
                {recentFeedsList.map((recentFeeds, index) => {
                    return(
                        <Box key={index}>  
                            <Container>
                                {recentFeeds.data.length === 0 ? recentFeeds.comment2 :
                                <>
                                    {recentFeeds.comment}
                                    <FiPlusCircle color="#7767FD" size="20" style={{position:'relative', left:'0.3rem'}} onClick={() => {onClick(recentFeeds.id)}}/>
                                </>}
                            </Container>
                            {recentFeeds.data.length === 0 ? <Dum src={blank}/> : <CanvasList size="s" up={false} list={recentFeeds.data.slice(0,3)}/>}
                        </Box>
                    );
                })}
            </Wrapper>
        );
    } else  if(level === 1) {
        return (
            <Wrapper>
                <IoArrowBackCircle color="#7767FD" size="40" onClick={()=>setLevel(level-1)}/>
                <Comment>{recentFeedsList[kind].comment}</Comment>
                <CanvasAlbumList size="m" list={recentFeedsList[kind].data}/>
            </Wrapper>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedsPage;