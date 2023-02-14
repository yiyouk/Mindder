import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import styled from "styled-components";

import CanvasAlbumList from "../commons/list/CanvasAlbumList";
import CanvasList from "../commons/list/CanvasList"
import ErrorPage from "./ErrorPage";
import {Line} from "./UserPage";

import api from "../api/api";

import "../assets/css/main.css";
import blank from "../assets/images/blank.png";
import {FiPlusCircle} from "react-icons/fi";
import {IoArrowBackCircle} from "react-icons/io5";
import {BsFillPlusCircleFill} from "react-icons/bs";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0.5rem 0 0 0;
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
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: rgb(67, 67, 67);
    margin: 0rem 0 0.7rem 0;
`  

/////////////////////////컴포넌트 시작///////////////////////////////
function FeedsPage() {
    const navigate = useNavigate()               
    const nickName = useSelector((state)=>state.USER.nickName)
    const [realtimeFeeds, setRealtimeFeeds] = useState([])
    const [popularFeeds, setPopularFeeds] = useState([])
    const [neighborFeeds, setNeighborFeeds] = useState([])
    const [realtimeNum, setRealtimeNum] = useState(1)
    const [popularNum, setPopularNum] = useState(1)
    const [neighborNum, setNeighborNum] = useState(1)
    const [plus, setPlus] = useState(true);
    const [level, setLevel] = useState(0); //목록 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(1); //종류   
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


    //실시간 피드 가져오기
    const getRealtimeFeeds = async() => {
        try {
            const response = await api.get(`/feeds/realtime-feed?pageNum=${realtimeNum}`);

            if (response.data.success){
                setRealtimeFeeds(realtimeFeeds.concat(response.data.data.feedList));
                setRealtimeNum(response.data.data.pageNum.pageNum+1);
                setPlus(response.data.data.pageNum.next);
            } else {
                console.error("조회실패");
            }

        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }


    //인기 피드 가져오기
    const getPopularFeeds = async() => {
        try {
            const response = await api.get(`/feeds/popular-feed?pageNum=${popularNum}`);
            if (response.data.success){
                setPopularFeeds(popularFeeds.concat(response.data.data.feedList));
                setPopularNum(response.data.data.pageNum.pageNum+1);
                setPlus(response.data.data.pageNum.next);
            } else {
                console.error("조회실패");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    
    //이웃 데이터 피드 가져오기
    const getNeighborFeeds = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/neighbors?pageNum=${neighborNum}`);    

            if(response.data.success){
                setNeighborFeeds(neighborFeeds.concat(response.data.data.feedList));
                setNeighborNum(response.data.data.pageNum.pageNum+1);
                setPlus(response.data.data.pageNum.next);
            } else {
                console.error("조회실패");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    const clickPlus = () => {
        if (kind === 0) {
            getRealtimeFeeds()
        } else if(kind === 1) {
            getPopularFeeds();            
        } else if(kind === 2) {
            getNeighborFeeds();
        }
    }


    if(level === 0){
        return (
            <div>   
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
            </div>
        );
    } else  if(level === 1) {
        return (
            <div>
                <IoArrowBackCircle color="#7767FD" size="40" style={{position:"relative", top:"2rem"}} onClick={()=>{setLevel(level-1);}}/>
                <Comment>{recentFeedsList[kind].comment}</Comment>
                <Line/>
                <CanvasAlbumList size="m" list={recentFeedsList[kind].data}/>
                { plus ?
                    <Wrapper>
                        <BsFillPlusCircleFill color="#7767FD" size="38" onClick={clickPlus}/>
                    </Wrapper>
                    :
                    null
                }
            </div>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedsPage;