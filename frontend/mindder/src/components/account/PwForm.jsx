import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api"

import '../../assets/css/main.css';

function PwRegister(props) {
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
    //현재 비번 친거랑 실제랑 같은가 비동기
    getPassord();

    //새비번이랑 확인
    if(passwordNew !== passwordNow){
      alert("비밀번호와 확인 비밀번호가 다릅니다.");
    } else{
      //비번 변경하기
      changePassword();
    }
  }

  //현재 비밀번호가 맞는지 확인
  const getPassord = async () => {
    const response = await api.post(`/users/password`, {
      password : passwordNow
    });

    if(!response.data.isPasswordMatched){
      alert("현재 비밀번호가 일치하지 않습니다.");
    } else{
      navigate("/accounts/password/change")
    }
    
  }

  //비밀번호 변경 api
  const changePassword = async () => {
    const response = await api.post(`/users/password`, {
      password : passwordNow
    });

    if(!response.data.isPasswordMatched){
      alert("현재 비밀번호가 일치하지 않습니다.");
    } else{
      navigate("/accounts/password/change")
    }
    
  }

  return (
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
              <button className="maincolor-white-btn"
                  onClick={() => {
                      findPassword();
                      // navigate("/login");
                  }}>
                  확인
              </button>
            </div>

        </form>
  )
}

export default PwRegister;