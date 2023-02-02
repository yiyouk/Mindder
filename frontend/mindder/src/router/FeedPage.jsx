import React, { useEffect, useState }from "react";
import "../assets/css/main.css";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import CanvasList from "../commons/list/CanvasList";
import FeedRecoDetail from "../components/feed/FeedRecoDetail";
import PlusIcon from "../assets/images/icon5.png";
import BackIcon from "../assets/images/back.png";
import api from "../api/api";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    margin: 0 0 3rem 0;
`;

const Container = styled.div`
    display: flex;
    color: rgb(67, 67, 67);
    font-weight: 600;
    /* border:1px solid black;  */
    margin: 1.5rem 0 1rem 0;
`  

const ContainerT = styled.div`
    display: flex;
    flex-direction:column;
    margin-bottom: 2rem;
    /* border:1px solid blue; */
`  

const Comment = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 500;
`  

function FeedPage(props) {
    const navigate = useNavigate()
    const [level, setLevel] = useState(0);
    const [kind, setKind] = useState(0);
      
    const onClick = (kind) => {
        setLevel(level+1);
        setKind(kind.id);
    }
    
    const userIdx = useSelector((state)=>state.userState.userIdx)
    const [similarTagFeeds, setSimilarTagFeeds] = useState([])
    const [similarColorFeeds, setSimilarColorFeeds] = useState([])
    const [neighborFeeds, setNeighborFeeds] = useState([])

    async function getSimilarTagFeeds(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/similarity-tag`, null);

            if(response.data.success===true){
                console.log(`감정태그피드 데이터 불러오기 : ${response.data.message}`);
                const tagFeedList = response.data.data
                // const tempList = tagFeedList.slice(0,2)
                console.log(tagFeedList)
                setSimilarTagFeeds(tagFeedList)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    async function getSimilarColorFeeds(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/similarity-color`, null);

            if(response.data.success===true){
                console.log(`감정색피드 데이터 불러오기 : ${response.data.message}`);
                const colorFeedList = response.data.data
                // const tempList = colorFeedList.slice(0,2)
                console.log(colorFeedList)
                setSimilarColorFeeds(colorFeedList)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    async function getNeighborFeeds(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/neighbors/`, null);

            if(response.data.success===true){
                console.log(`이웃피드데이터 불러오기 : ${response.data.message}`);
                const neighborFeedList = response.data.data
                // const tempList = neighborFeedList.slice(0,2)
                console.log(neighborFeedList)
                setNeighborFeeds(neighborFeedList)
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
        // getSimilarColorFeeds()
        getNeighborFeeds()
    }, [])

    const recentFeedList = [
        {
            id: "0",
            comment: "최근, 비슷한 감정을 공유했어요 ",
            data:similarTagFeeds
        },
        {
            id: "1",
            comment: '최근, 비슷한 감정색을 사용했어요 ',
            data:similarColorFeeds
        },
        {
            id: "2",
            comment: "동찬님이 이웃이 최근 공유했어요",
            data:neighborFeeds
        }
    ];
    
    if(level == 0){
        return (
            <Wrapper>   
                <ContainerT>
                    {recentFeedList.map((recentFeed)=>(
                        <>
                        <Container key={recentFeed.id}>
                            <div>{recentFeed.comment}</div>
                            <button type="button" className="img_btn" onClick={() => {onClick(recentFeed)}}>
                            <img  src={PlusIcon}/></button>
                        </Container>
                        <CanvasList feedList={recentFeed.data.slice(0,2)}/>
                        </>
                    ))}
                </ContainerT>
            </Wrapper>
        );
    } else  if(level == 1) {
        return (
            <Wrapper>
                <button type="button" className="img_btn"  onClick={()=>setLevel(level-1)}><img id = "back_btn" src={BackIcon}/></button>
                <Comment>{recentFeedList[kind].comment}</Comment>
                <FeedRecoDetail feedList={recentFeedList[kind].data}/>
            </Wrapper>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedPage;