import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api"

import '../assets/css/main.css';

function PwChangePage(props) {
  const navigate = useNavigate();
  const [passwordNow, setPasswordNow] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewCheck, setPasswordNewCheck] = useState("");

  const handleChangePw = e => {
    setPasswordNow(e.target.value);
  }

  const handleChangePwNew = e => {
    setPasswordNew(e.target.value);
  }

  const handleChangePwNewC = e => {
    setPasswordNewCheck(e.target.value);
  }

  
  const findPassword = () => {
    if(passwordNow === ""){
      alert("현재 비밀번호를 입력해주세요.");
    } else if(passwordNew === ""){
      alert("새 비밀번호를 입력해주세요.");
    } else if(passwordNewCheck === ""){
      alert("새 비밀번호 확인을 입력해주세요.");
    } else if(passwordNew !== passwordNewCheck){
      alert("새 비밀번호와 새 비밀번호 확인 값이 다릅니다.");
    } else{
      getPassord();
    }
  }

  //현재 비밀번호가 맞는지 확인
  const getPassord = async () => {
    const response = await api.post(`/users/password`, {
      password : passwordNow
    });

    console.log(response.data)
    if(!response.data.success){
        alert("현재 비밀번호가 일치하지 않습니다.");
    } else {
      changePassword();
    }
  }

  //비밀번호 변경 api
  const changePassword = async () => {
    const response = await api.patch(`/users/change-password`, {
      password : passwordNew
    });

      if(response.data.success){
        alert("비밀번호 변경 완료");
        navigate("/accounts/edit")
      } else{
        alert("비밀번호 변경 실패! 다시 시도해주세요.")
      }
  }
  
  

  return (
    <div id="main">
        <header>
            <h2>비밀번호 변경</h2>
        </header>
        <form className="box">
            <div className="col-12">
                <label htmlFor= "password"className="form-label">현재 비밀번호</label>
                <input value={passwordNow} type="password" name="passwordNow" id="passwordNow" placeholder=" 비밀번호" onChange={handleChangePw}/>
            </div>
            <div className="col-12">
                <label htmlFor= "passwordNew"className="form-label">새 비밀번호</label>
                <input value={passwordNew} type="password" name="passwordNew" id="passwordNew" placeholder="새 비밀번호" onChange={handleChangePwNew}/>
                {/* <label className="warning" v-if="notSamePassword">* 비밀번호는 8~16자리 영문, 숫자 사용 가능</label> */}
            </div>
            <div className="col-12">
                <label htmlFor= "passwordNewCheck"className="form-label">새 비밀번호 확인</label>
                <input value={passwordNewCheck} type="password" name="passwordNewCheck" id="passwordNewCheck" placeholder="새 비밀번호 확인" onChange={handleChangePwNewC}/>
            </div>
            <div className="center-container">
              <input type="button" value="확인" className="maincolor-white-btn"
                  onClick={() => {
                      findPassword()
                  }}/>
            </div>
        </form>
    </div>
  )
}

export default PwChangePage;