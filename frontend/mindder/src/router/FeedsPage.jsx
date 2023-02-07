import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import styled from "styled-components";
import FeedsList from "../components/feed/FeedsList";
import CanvasList from "../commons/list/CanvasList";
import ErrorPage from "./ErrorPage";
import api from "../api/api";

import "../assets/css/main.css";
import blank from "../assets/images/blank.png";
import {FiPlusCircle} from "react-icons/fi";
import {IoArrowBackCircle} from "react-icons/io5";

const Wrapper = styled.div`
    margin: 3rem 0 0 0;
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
    margin: 0.3rem 0 0.8rem 0;
`  

/////////////////////////컴포넌트 시작///////////////////////////////
function FeedsPage() {
    const navigate = useNavigate()
    const [level, setLevel] = useState(0); //목록 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(0); //종류
      
    const onClick = (kind) => {
        setLevel(level+1);
        setKind(kind.id);
    }
    
    //헌재 사용 유저 idx 꺼내기                         
    const nickName = useSelector((state)=>state.USER.nickName)
    const [similarTagFeeds, setSimilarTagFeeds] = useState([])
    const [similarColorFeeds, setSimilarColorFeeds] = useState([])
    const [neighborFeeds, setNeighborFeeds] = useState([])

    //비슷한 태그 피드 가져오기
    const getSimilarTagFeeds = async() => { 
        try {
            const response = await api.get(`/feeds/similarity-tag`);

            if(response.data.success){
                console.log(`감정태그피드 데이터 불러오기 : ${response.data.message}`);
                const tagFeedsList = response.data.data;
                setSimilarTagFeeds(tagFeedsList);
                
                //더미 데이터 넣어주자...
                if(tagFeedsList.length === 0){
                }
                console.log(tagFeedsList)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }

        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }


    //비슷한 색 피드 가져오기
    const getSimilarColorFeeds = async() => { 
        try {
            const response = await api.get(`/feeds/similarity-color`);

            if(response.data.success){
                console.log(`감정색피드 데이터 불러오기 : ${response.data.message}`);
                const colorFeedsList = response.data.data
                // const tempList = colorFeedsList.slice(0,2)
                setSimilarColorFeeds(colorFeedsList)
                console.log(similarColorFeeds)

                ///더미 데이터 넣어주자...
                if(colorFeedsList.length === 0){
            
                }

            } else {
                alert("데이터를 조회하지 못했습니다.");
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
                console.log(`이웃피드데이터 불러오기 : ${response.data.message}`);
                const neighborFeedsList = response.data.data
                console.log(neighborFeedsList)
                setNeighborFeeds(neighborFeedsList)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    useEffect(()=>{
        // 서버에서 api구현되면 주석 푸삼
        // getSimilarTagFeeds()
        getSimilarColorFeeds();
        getNeighborFeeds();
    }, [])

    const recentFeedsList = [
        {
            id: "0",
            comment: "최근, 비슷한 감정을 공유했어요 ",
            comment2: "최근 공유한 감정이 없어요.",
            data: similarTagFeeds
        },
        {
            id: "1",
            comment: '최근, 비슷한 감정색을 사용했어요 ',
            comment2: "최근 공유한 색이 없어요.",
            data: similarColorFeeds
        },
        {
            id: "2",
            comment: `${nickName}님의 이웃이 최근 공유했어요`,
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
                                {recentFeeds.data.length === 0? recentFeeds.comment2:recentFeeds.comment}
                                {recentFeeds.data.length === 0? null:<FiPlusCircle color="#7767FD" size="20" style={{position:'relative', left:'0.3rem'}} onClick={() => {onClick(recentFeeds)}}/>}
                            </Container>
                            {/* {recentFeeds.data.length === 0 ? <Dum src={blank}/> : <CanvasList feedsList={recentFeeds.data.slice(0,2)}/>} */}
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
                <FeedsList feedsList={recentFeedsList[kind].data}/>
            </Wrapper>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedsPage;