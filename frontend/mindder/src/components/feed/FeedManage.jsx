import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuRight } from "react-icons/cg";
import styled from "styled-components";
import Modal from "./ModifyModal";

import api from "../../api/api"


//누르면 나오는거
const DropDown = styled.button`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

//박스 전체 컨테이너
const ListContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  border: solid 0.1rem  #7767FD;
  position: absolute;
  right: 0.3rem;
  display:none;
  ${DropDown}:active & {
    display: block;
  }
  ${DropDown}:focus & {
    display: block;
  }
`;

const W = styled.div`
    border-bottom-left-radius: 0.8rem;   
    border-top-left-radius: 0.8rem;   
    background-color: white;
    color: #7767FD;
    padding: 0.3rem 0.2rem 0.3rem 0.3rem;
    width: 2.3rem;
`
const P = styled.div`
    border-bottom-right-radius: 0.8rem;   
    border-top-right-radius: 0.8rem;   
    border: none;
    background-color:#7767FD;
    color: #ffffff;
    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
    width: 2.3rem;
`

const F = styled.div`
    display: flex;
`

function FeedManage({normalTag, mainText, feedIdx, isPublic}) {
    const navigate = useNavigate();
    const myIdx = useSelector((state)=>state.USER.myIdx)
    const [modalOpen, setModalOpen] = useState(false);

    //모달창 열기
    const openModal = () => {
      setModalOpen(true);
    };

    //모달창 닫기
    const closeModal = () => {
      setModalOpen(false);
    };

    //글 삭제하기
    const deletePost = () => {
       if(window.confirm("게시글을 삭제하시겠습니까?")){
            sendDelete();
       }
    }

    //글 삭제 비동기 통신
    const sendDelete = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.delete(`feeds/${feedIdx}`);
            
            if(response.data.success){
                alert("게시글 삭제 성공");
                navigate(`/${myIdx}`);
            } else{
                alert("게시글 삭제 실패! 다시 시도해주세요.");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <>
        <Modal normalTag={normalTag} isPublic={isPublic} feedIdx={feedIdx} mainText={mainText} open={modalOpen} close={closeModal}></Modal>
            <DropDown>
                <CgMenuRight size="30" color="#7767FD"/>
                <ListContainer>
                    <F>
                        <W onClick={openModal}>수정</W>
                        <P onClick={deletePost}>삭제</P> 
                    </F>
                </ListContainer>
            </DropDown>
        </>
    );
};

export default FeedManage;