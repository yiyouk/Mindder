import React from "react";
import styled from "styled-components";
import Imag from "../../assets/images/face2.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../api/api"

const Wrapper = styled.div`
    display: flex;
    max-width: 21rem;
    background: white;
    align-items: center;
`;

const WrapperTop = styled.div`
    display: flex;
    flex-direction: column;
    width: 19rem;
    height: 4rem;
    margin: 0 0 0 1rem;
    background: white;
    overflow: scroll;
    /* border:1px solid; */
`;

const ContentText = styled.div`
    color: rgb(67, 67, 67);
    font-size: 0.75rem;
    max-width: 12rem;
    padding: 0 0 0 0;
    margin: 0 0 -2rem 0;
    /* border:1px solid blue; */
    /* display:grid; */
`;

const ProfileText = styled.p`
    color: rgb(67, 67, 67);
    font-weight: 600;
    font-size: 0.75rem;
`;

const ContextWrapper = styled.div`
    width: 16rem;
    max-width: 16rem;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
`;

const Date = styled.div`
    /* display: flex; */
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
    /* justify-content: center !important; */
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
        sendDelete();
        // if(comment.userIdx === MyIdx){
            // if(useConfirm("댓글을 삭제하시겠습니까?", true, false)){
            //     sendDelete();
            // }
        // }
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
                <WrapperTop>
                    <ContextWrapper>
                        <ProfileText>{comment.nickname}</ProfileText>
                        <Date>{comment.updateDate}</Date>
                    </ContextWrapper>
                <ContentText>{comment.feedComment}</ContentText>
                </WrapperTop>
                {comment.userIdx === MyIdx? <ContentText onClick={deleteComment}> x </ContentText> : null}
            </Wrapper>
    );
}

export default CommentListItem;
