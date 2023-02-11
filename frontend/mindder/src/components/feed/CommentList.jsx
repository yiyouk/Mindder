import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import CommentListItem from "./CommentListItem";

import api from "../../api/api"
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0.5rem;
    & > .CC {
        align-self:flex-start;
        font-size: 0.7rem;
        font-weight: 600;
        color: gray;
        margin-bottom: 1rem;
    }
    /* border:1px solid; */
`;

function CommentList({feedIdx, commentCount}) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [number, setNumber] = useState(commentCount);

    //데이터 가져오기
    useEffect(()=>{
        getComments();
    }, [commentCount, number])

    const getData = (number) => {
        setNumber(number);
    }

    //댓글 데이터 가져오기
    const getComments = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.get(`/comments/${feedIdx}`);

            if(response.data.success){
                console.log(response.data.data);
                setComments(response.data.data)
            } else {
                alert("데이터를 조회하지 못했습니다.");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <Wrapper>
            <span className="CC"> 댓글({comments.length})</span>
            {comments.map((comment, index) => {
                return <CommentListItem getData={getData} commentCount={commentCount} key={index} comment={comment} 
                userIdx={comment.userIdx}
                />;
            })}
        </Wrapper>
    );
}

export default CommentList;
