// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, {useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostEmoTag from "../components/post/PostEmotag";
import PostEmocolor from "../components/post/PostEmocolor";
import PostDraw from "../components/post/PostDraw";
import PostCommentwrite from "../components/post/PostCommentwrite";
import NextImg from "../assets/images/arrow.png";
import MainPage from "./MainPage";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_userDrawing } from "../redux/reducers";

import {IoArrowForwardCircleSharp, IoArrowBackCircleSharp} from "react-icons/io5";

const Wrapper = styled.div`
    padding: 0;
    /* width: 100vw; */
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid red; */
`;

const Btndiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:21rem;
    /* border:1px solid blue; */
`

const Next = styled.div`
    width: 42px;
    height: 36px;
    border: 1px solid #7767FD;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    /* position:relative;
    left:7.6rem;
    top:0.1rem; */
    background-image:url(${NextImg});
    background-size: 55%;
    background-position:center;
    background-position-x:12px;
    background-repeat: no-repeat;
`

function PostPage(props) {

    useEffect(() => {
  
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        }
}, []);

    const [level, setLevel] = useState(1);
    const navigate = useNavigate();
    const checkUserState = useSelector((state)=>state.USER)
    // console.log(checkUserState)


    const dispatch = useDispatch()
    const canvasRef = useRef(null);
    const imageSaved = () => {
        const canvas = canvasRef.current;
        console.log(canvas)
        const image = canvas.toDataURL('image/webp', 0.5);
        console.log(image)
        dispatch(SAVE_userDrawing(image))
    }


    switch (level) {
        case 1:
            return (
                <Wrapper>
                    <Btndiv>
                    <div/>
                    <IoArrowForwardCircleSharp color="#7767FD" size="35"
                    onClick={()=>{
                        if (checkUserState.todayEmotion){
                            setLevel(level+1)
                        } else {
                            alert("감정을 선택해주세요")
                        }
                    }}
                    />
                    </Btndiv>
                    <PostEmoTag/>
                </Wrapper>
            )
        case 2:
            return(
                <Wrapper>
                    <Btndiv>
                    <IoArrowBackCircleSharp color="#7767FD" size="35"
                    onClick={()=>{
                        setLevel(level-1)
                    }}
                    /><IoArrowForwardCircleSharp color="#7767FD" size="35"
                    onClick={()=>{
                        if (checkUserState.todayColor){
                            setLevel(level+1)
                        } else {
                            alert("색을 채워주세요")
                        }
                    }}/>
                    </Btndiv>
                    <PostEmocolor/>
                </Wrapper>
            )
        case 3:
            return(
                <Wrapper>
                    <Btndiv>
                        <IoArrowBackCircleSharp color="#7767FD" size="35"
                        onClick={()=>{
                            setLevel(level-1)
                        }}
                        /><IoArrowForwardCircleSharp color="#7767FD" size="35"
                        onClick={()=>{
                            setLevel(level+1)
                            imageSaved()
                    }}/>
                    </Btndiv>
                    <PostDraw imageSaved={imageSaved} canvasRef={canvasRef}/>
                </Wrapper>
            )
        case 4:
            return(
                <Wrapper>
                    <Btndiv>
                    <IoArrowBackCircleSharp color="#7767FD" size="35"
                    onClick={()=>{
                        setLevel(level-1)
                    }}
                    />
                    <div/>
                    </Btndiv>
                    <PostCommentwrite/>
                </Wrapper>
            )
        default :
            return
    
        // 추천피드페이지로 넘어감
    }
}

export default PostPage;
