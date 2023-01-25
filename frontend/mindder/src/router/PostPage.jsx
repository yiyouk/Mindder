// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostEmoTag from "../components/post/PostEmotag";
import PostEmocolor from "../components/post/PostEmocolor";
import PostDraw from "../components/post/PostDraw";
import PostCommentwrite from "../components/post/PostCommentwrite";
import NextImg from "../assets/images/arrow.png"
import PrevImg from "../assets/images/arrow2.png"
import MainPage from "./MainPage";

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

const Prev = styled.div`
    width: 42px;
    height: 36px;
    border: 1px solid #7767FD;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    /* position:relative;
    right:7.6rem;
    top:0.1rem; */
    border-radius: 6px;
    background-image:url(${PrevImg});
    background-size: 55%;
    background-position:center;
    background-position-x:8px;
    background-repeat: no-repeat;
`

function PostPage(props) {
    const [level, setLevel] = useState(1);
    const navigate = useNavigate();
    
    switch (level) {
        case 1:
            return (
                <Wrapper>
                    <Btndiv>
                    <div/>
                    <Next
                    onClick={()=>{
                        setLevel(level+1)
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
                    <Prev
                    onClick={()=>{
                        setLevel(level-1)
                    }}
                    /><Next
                    onClick={()=>{
                        setLevel(level+1)
                    }}/>
                    </Btndiv>
                    <PostEmocolor/>
                </Wrapper>
            )
        case 3:
            return(
                <Wrapper>
                    <Btndiv>
                    <Prev
                    onClick={()=>{
                        setLevel(level-1)
                    }}
                    /><Next
                    onClick={()=>{
                        setLevel(level+1)
                    }}/>
                    </Btndiv>
                    <PostDraw/>
                </Wrapper>
            )
        case 4:
            return(
                <Wrapper>
                    <Btndiv>
                    <Prev
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
