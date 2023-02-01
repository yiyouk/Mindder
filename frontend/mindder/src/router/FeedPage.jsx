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
    const [number, setNumber] = useState(0);
    const [kind, setKind] = useState(0);
    const textList = [
        {
            id: "1",
            comment: "최근, 비슷한 감정을 공유했어요 ",
        },
        {
            id: "2",
            comment: '최근, 비슷한 감정색을 사용했어요 ',
        },
        {
            id: "3",
            comment: "동찬님이 이웃이 최근 공유했어요",
        }
    ];
    
    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
    }
    
    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    }
    
    const onClick = (kind) => {
        onIncrease();
        setKind(kind.id-1);
        // navigate(`/f/${kind.id}`)
    }

    // 서버api 구현되면 수정할 예정
    // const [similarTag, setfeedsTag] = useState([])
    // const [similarColor, setfeedsTag] = useState([])
    // const [neighbors, setfeedsTag] = useState([])
    // async function getFeedsTag(){ // async, await을 사용하는 경우
    //     try {
    //         const response = await api.get(`/feeds/similarity-tag`, null);

    //         if(response.data.success===true){
    //             console.log(response.data.message);
    //             const ListFromServer = response.data.data
    //             console.log(ListFromServer)
    //             setfeedList(ListFromServer)
    //         } else {
    //             alert("데이터를 조회하지 못했습니다.");
    //         }
            
    //     } catch (e) {
    //         console.error(e);
    //         navigate("/error");
    //     }
    // }

    // useEffect(()=>{
    //     getFeeds()
    // }, [])
    
    if(number == 0){
        return (
            <Wrapper>   
                <ContainerT>
                    {textList.map((text)=>(
                        <>
                        <Container>
                            <div>{text.comment}</div>
                            <button type="button" className="img_btn" onClick={() => {onClick(text)}}>
                            <img  src={PlusIcon}/></button>
                        </Container>
                        <CanvasList size={"s"} feedIdx={null}/>
                        </>
                    ))}
                </ContainerT>
            </Wrapper>
        );
    } else  if(number == 1) {
        return (
            <Wrapper>
                <button type="button" className="img_btn"  onClick={onDecrease}><img id = "back_btn" src={BackIcon}/></button>
                <Comment>{textList[kind].comment}</Comment>
                <FeedRecoDetail></FeedRecoDetail>
            </Wrapper>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedPage;