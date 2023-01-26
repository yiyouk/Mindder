import React, { useState }from "react";
import "../assets/css/main.css";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import CanvasList from "../commons/list/CanvasList";
import FeedRecoDetail from "../components/feed/FeedRecoDetail";
import PlusIcon from "../assets/images/icon5.png";
import BackIcon from "../assets/images/back.png";

const Wrapper = styled.div`
    margin: 2rem 0 3rem 0;
`;

const Container = styled.div`
    display: flex;
    color: rgb(67, 67, 67);
    font-weight: 600;
`  

const ContainerT = styled.div`
    margin-bottom: 3rem;
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
    const [number, setNumber] = useState(0);
    const [kind, setKind] = useState(0);
    const text = [
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
    
    console.log(number);
    console.log(kind);
    
    function changeState(s) {
        setKind(s);
    }

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
    }

    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    }

    if(number == 0){
        return (
            <Wrapper>
                <ContainerT>
                    <Container>
                        <div>{text[0].comment}</div>
                        <button type="button" className="img_btn" onClick={() => {
                  onIncrease();
                  changeState(0);
                  }}><img  src={PlusIcon}/></button>
                    </Container>
                    <CanvasList ></CanvasList>
                </ContainerT>
                <ContainerT>
                    <Container>
                        <div>{text[1].comment}</div>
                        <button type="button" className="img_btn" onClick={() => {
                  onIncrease();
                  changeState(1);
                  }}><img  src={PlusIcon}/></button>
                    </Container>
                    <CanvasList></CanvasList>
                </ContainerT>
                <ContainerT>
                    <Container>
                        <div>{text[2].comment}</div>
                        <button type="button" className="img_btn" onClick={() => {
                  onIncrease();
                  changeState(2);
                  }}><img  src={PlusIcon}/></button>
                    </Container>
                    <CanvasList></CanvasList>
                </ContainerT>
            </Wrapper>
        );
    } else  if(number == 1) {
        return (
            <Wrapper>
                <button type="button" className="img_btn"  onClick={onDecrease}><img id = "back_btn" src={BackIcon}/></button>
                <Comment>{text[kind].comment}</Comment>
                <FeedRecoDetail></FeedRecoDetail>
            </Wrapper>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default FeedPage;