import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Imag from "../../assets/images/face2.png";

import api from "../../api/api";

const Wrapper = styled.div`
    display: flex;
    max-width: 21rem;
    background: white;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    margin: 0 0 0 1rem;
`;

const SideContainer = styled.div`
    width: 16em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ContentText = styled.span`
    max-width: 18rem;
    color: rgb(67, 67, 67);
    font-size: 0.75rem;
    margin-bottom: 1.3rem;
`;

const CommentInfo = styled.div`
    max-width: 18rem;
    display: flex;
    align-content: flex-end;
    margin-bottom: 0.3rem;
`;

const NickName = styled.span`
    color: rgb(67, 67, 67);
    font-weight: 600;
    font-size: 0.75rem;
    margin-right: 0.5rem;
`;

const Date = styled.span`
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
    margin-right: 1rem;
`
const X = styled.span`
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
`

const Image = styled.img`
    width: 2rem;
    height: 2rem;
    border: 1px solid #c0c0c0;
    border-radius: 100%;
`

function CommentListItem({comment}) {
    const navigate = useNavigate();
    const MyIdx = useSelector((state)=>state.USER.myIdx);
    
    const deleteComment = () => {
        if(comment.userIdx === MyIdx){
            if(window.confirm("댓글을 삭제하시겠습니까?")){
                sendDelete();
            }
        }
    }
    
    //댓글 삭제 비동기 통신
    const sendDelete = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.delete(`/comments/${comment.commentIdx}`);
            
            if(response.data.success){
                alert("댓글 삭제 성공");
            } else{
                alert("댓글 삭제 실패! 다시 시도해주세요.");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
            <Wrapper>
                <Image src = {Imag}></Image>
                <Main>
                    <SideContainer>
                        <CommentInfo>
                            <NickName>{comment.nickname}</NickName>
                            <Date>{comment.updateDate}</Date>
                        </CommentInfo>
                        {comment.userIdx === MyIdx? <X onClick={deleteComment}> 삭제 </X> : null}
                    </SideContainer>
                    <ContentText>{comment.feedComment}</ContentText>
                </Main>
            </Wrapper>
    );
}

export default CommentListItem;
