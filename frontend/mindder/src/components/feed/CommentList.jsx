import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import CommentListItem from "./CommentListItem";

import api from "../../api/api"
import styled from "styled-components";

const Wrapper = styled.div`
    width: 19em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList({feedIdx}) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    //데이터 가져오기
    useEffect(()=>{
        getComments();
    }, [])


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
            {comments.map((comment, index) => {
                return <CommentListItem key={index} comment={comment} />;
            })}
        </Wrapper>
    );
}

export default CommentList;
