import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuRight } from "react-icons/cg";
import styled from "styled-components";
import Modal from "./ModifyModal";

import api from "../../api/api"

const Li = styled.li`
    list-style: none;
    /* border-bottom: 3rem; */
`;

const Ul = styled.ul`
    list-style: none;
    font-style: normal;
    font-weight: bold;
    font-size: 0.8rem;
    color: #666666;
    width: 3rem;
    margin: 0.5rem 0.2rem 0.5rem 0.2rem;
    padding: 0 0 0 0;
`;

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
  border-radius: 5px;
  border: solid 0.6px  #7767FD;
  padding: 3px;
  margin-top: 7px;
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

const W = styled.span`
    background-color: white;
    color: #7767FD;
`

function FeedManage({mainText, feedIdx}) {
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
        <Modal feedIdx={feedIdx} mainText={mainText} open={modalOpen} close={closeModal}></Modal>
            <Li>
                <DropDown>
                    <CgMenuRight size="30" color="#7767FD"/>
                    <ListContainer>
                        <Ul>
                            <Li onClick={openModal}>
                                <W>수정</W> 
                            </Li>
                            <Li onClick={deletePost}>
                                <W>삭제</W> 
                            </Li>
                        </Ul>
                    </ListContainer>
                </DropDown>
            </Li>
        </>
    );
};

export default FeedManage;