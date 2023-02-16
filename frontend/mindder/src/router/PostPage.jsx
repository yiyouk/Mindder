// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, {useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostEmoTag from "../components/post/PostEmotag";
import PostEmocolor from "../components/post/PostEmocolor";
import PostDraw from "../components/post/PostDraw";
import PostCommentwrite from "../components/post/PostCommentwrite";
import NextImg from "../assets/images/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_todayColor, SAVE_todayEmotion, SAVE_userDrawing } from "../redux/reducers";


import Swal from "sweetalert2";
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

const M = styled.div`
    height: 35px;
    width: 35px;
`

const FeedInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;  
    color: #7767FD;
    font-size: 0.7rem;
    `

const FeedInfo = styled.div`
    margin: 0rem 0.25rem 0rem 0.25rem;
    text-align: center;
    align-items: center;
    /* border: 0.02rem solid #7767FD; */
    width: 3.5rem;
    border-radius: 15px;
    box-shadow: 1px 1px 2px rgba(139, 108, 139, 0.5);
    color:#FFFFFF;
    font-size: 0.85rem;
    padding: 0.3rem;
    background-color: #7767FD;
`

function PostPage(props) {

    useEffect(() => {
  
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            overscroll-behavior-y: none;
            width: 100%;`;
            
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
            dispatch(SAVE_todayEmotion(null))
            dispatch(SAVE_todayColor(null))
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
    const todayColor = useSelector((state)=>state.USER.todayColor)
    const todayEmo = useSelector((state)=>state.USER.todayEmotion)

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
                            Swal.fire({
                                icon: 'warning',               
                                width: 300,
                                iconColor: '#7767FD',
                                text: '감정을 선택해주세요', 
                                confirmButtonColor: '#7767FD',
                                confirmButtonText: '확인',
                              });
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
                            Swal.fire({
                                icon: 'warning',               
                                width: 300,
                                iconColor: '#7767FD',
                                text: '색을 채워주세요', 
                                confirmButtonColor: '#7767FD',
                                confirmButtonText: '확인',
                            });
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
                            imageSaved()
                        }}
                        />
                        <FeedInfoContainer>
                            <FeedInfo># {todayColor}</FeedInfo>
                            <FeedInfo># {todayEmo}</FeedInfo>
                        </FeedInfoContainer>
                        <IoArrowForwardCircleSharp color="#7767FD" size="35"
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
                    <FeedInfoContainer>
                        <FeedInfo># {todayColor}</FeedInfo>
                        <FeedInfo># {todayEmo}</FeedInfo>
                    </FeedInfoContainer>
                    <M/>
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
