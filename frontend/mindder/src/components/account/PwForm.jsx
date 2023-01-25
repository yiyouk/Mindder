// 비밀번호 변경
// 회원가입-정보 등록
import React from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/main.css';

function PwRegister(props) {
  
  const navigate = useNavigate();

  return (
        <form className="box">
            <div className="col-12">
                <label className="form-label">현재 비밀번호</label>
                <input type="password" name="passwordNow" id="passwordNow" placeholder=" 현재 비밀번호" />
            </div>
            <div className="col-12">
                <label className="form-label">새 비밀번호</label>
                <input type="password" name="passwordNew" id="passwordNew" placeholder=" 새 비밀번호" />
                <label className="warning" v-if="notSamePassword">* 비밀번호는 8~16자리 영문, 숫자 사용 가능</label>
            </div>
            <div className="col-12">
                <label className="form-label">새 비밀번호 확인</label>
                <input type="password" name="passwordNewCheck" id="passwordNewCheck" placeholder=" 새 비밀번호 확인"/>
            </div>
            <div className="center-container">
              <button className="maincolor-white-btn"
                  onClick={() => {
                      navigate("/login");
                  }}>
                  확인
              </button>
            </div>
        </form>
  )
}

export default PwRegister;