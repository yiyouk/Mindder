import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import CommentListItem from "./CommentListItem";

import api from "../../api/api"
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & > .CC {
        align-self:flex-start;
        font-size: 0.7rem;
        font-weight: 600;
        color: gray;
        margin-bottom: 1rem;
    }
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
    const getComments = async() => {
        try {
            const response = await api.get(`/comments/${feedIdx}`);

            if(response.data.success){
                setComments(response.data.data)
            } else {
                console.log("조회 실패")
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
