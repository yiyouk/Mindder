import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import api from "../../api/api"

import '../../assets/css/modal.css';

const Modal = ({open, close, mainText, feedIdx}) => {
  const navigate = useNavigate();
  const [Text, setText] = useState()

  //현재 글
  useEffect(()=>{
      setText(mainText);
  }, [])


  //새로운 글 입력중
  const handleText = e => {
      setText(e.target.value);
  }
  console.log(Text)
   //댓글 수정하기 비동기 통신
   const modifyPost = async() => { // async, await을 사용하는 경우
    try {
        const response = await api.put(`/feeds`,{
          feedIdx: feedIdx,
          mainText: Text,
          normalTag: "#반가움#행복",
          public: true
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
          <footer>
            <button className="close" onClick={()=>{close(); modifyPost();}}> 수정 </button>
            <button className="close" onClick={close}> 닫기 </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;