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


/////////////////////////컴포넌트 시작///////////////////////////////
function FeedPage(props) {
    const navigate = useNavigate()
    const [level, setLevel] = useState(0); //목록 보기 0, 자세히 보기 1
    const [kind, setKind] = useState(0); //종류
      
    const onClick = (kind) => {
        setLevel(level+1);
        setKind(kind.id);
    }
    
    //헌재 사용 유저 idx 꺼내기                                                                                             
    const myIdx = useSelector((state)=>state.USER.myIdx)
    const nickName = useSelector((state)=>state.USER.nickName)
    const [similarTagFeeds, setSimilarTagFeeds] = useState([])
    const [similarColorFeeds, setSimilarColorFeeds] = useState([])
    const [neighborFeeds, setNeighborFeeds] = useState([])

    //백엔드 미구현으로 주석처리
    //비슷한 태그 피드 가져오기
    // const getSimilarTagFeeds = async() => { // async, await을 사용하는 경우
    //     try {
    //         const response = await api.get(`/feeds/similarity-tag`);

    //         if(response.data.success){
    //             console.log(`감정태그피드 데이터 불러오기 : ${response.data.message}`);
    //             const tagFeedList = response.data.data
    //             // const tempList = tagFeedList.slice(0,2)
    //             console.log(tagFeedList)
    //             setSimilarTagFeeds(tagFeedList)
    //         } else {
    //             alert("데이터를 조회하지 못했습니다.");
    //         }
    //     } catch (e) {
    //         console.error(e);
    //         navigate("/error");
    //     }
    // }

    //백엔드 미구현으로 주석처리
    //비슷한 색 피드 가져오기
    // const getSimilarColorFeeds = async() => { // async, await을 사용하는 경우
    //     try {
    //         const response = await api.get(`/feeds/similarity-color`);

    //         if(response.data.success){
    //             console.log(`감정색피드 데이터 불러오기 : ${response.data.message}`);
    //             const colorFeedList = response.data.data
    //             // const tempList = colorFeedList.slice(0,2)
    //             console.log(colorFeedList)
    //             setSimilarColorFeeds(colorFeedList)
    //         } else {
    //             alert("데이터를 조회하지 못했습니다.");
    //         }
    //     } catch (e) {
    //         console.error(e);
    //         navigate("/error");
    //     }
    // }

    //이웃 데이터 피드 가져오기
    const getNeighborFeeds = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.get(`/feeds/neighbors`);

            if(response.data.success){
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
        getNeighborFeeds();
    }, [])

    const recentFeedList = [
        {
            id: "0",
            comment: "최근, 비슷한 감정을 공유했어요 ",
            data: similarTagFeeds
        },
        {
            id: "1",
            comment: '최근, 비슷한 감정색을 사용했어요 ',
            data: similarColorFeeds
        },
        {
            id: "2",
            comment: `${nickName}님의 이웃이 최근 공유했어요`,
            data: neighborFeeds
        }
    ];
    
    if(level === 0){
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
    } else  if(level === 1) {
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