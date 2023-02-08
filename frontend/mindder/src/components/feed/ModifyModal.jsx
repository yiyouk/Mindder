import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import api from "../../api/api"

import styled from "styled-components";
import '../../assets/css/modal.css';


const Toggle = styled.button`
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background: #FFFFFF;
  border: 1px solid #7767FD;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  background: #7767FD;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(20px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const Container = styled.div`
  display:flex;
  align-items: center;
  font-size: 0.8rem;
  padding-left: 1rem;
`

const Side = styled.div`
  display:flex;
  justify-content: space-between;
`


const Modal = ({open, close, mainText, feedIdx, isPublic}) => {
  const navigate = useNavigate();
  const [Text, setText] = useState("")
  const [toggle, setToggle] = useState(isPublic);
  // const [isPublic, setIsPublic] = useState(isPublic);

  //토글 버튼 클릭
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  //현재 글
  useEffect(()=>{
      setText(mainText);
  }, [open])


  //새로운 글 입력중
  const handleText = e => {
      setText(e.target.value);
  }

   //댓글 수정하기 비동기 통신
   const modifyPost = async() => { // async, await을 사용하는 경우
    try {
        const response = await api.patch(`/feeds`,{
          feedIdx: feedIdx,
          mainText: Text,
          normalTag: "#바꾸냐고왜",
          public: toggle
        });
        
        if(response.data.success){
            alert("게시글 수정 성공");
            window.location.replace(`/f/${feedIdx}`)
        } else{
            alert("게시글 수정 실패! 다시 시도해주세요.");
        }
        
    } catch (e) {
        console.error(e);
        navigate("/error");
    }
}


  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            글 수정하기
          </header>
          <textarea cols="44" rows="10" value={Text} onChange={handleText}/>
          <Side>
            <Container>
              <Toggle onClick={clickedToggle} toggle={toggle}>
                <Circle toggle={toggle}/>
              </Toggle>
                <span>{toggle ? "공 개" : "비공개"}</span>
            </Container>
            <footer>
              <button className="close" onClick={()=>{close(); modifyPost();}}> 수정 </button>
              <button className="close" onClick={close}> 닫기 </button>
            </footer>
          </Side>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;