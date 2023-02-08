import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Colors16 } from "../../redux/reducers";
import styled, {css} from "styled-components";

//비동기 동신
import api from "../../api/api";

import '../../assets/css/main.css';

const colortyles = css`
  ${({mypick}) => css`
    background-color: ${mypick};
  `}
`;

const ColorStyled = styled.div`
    ${colortyles}
    width: 1.5rem;
    height: 1.5rem;
    border: solid 0.01rem rgb(231, 231, 231);
    &:hover {
        outline: 0.03rem solid black;
    }
    margin: 0.5rem;
`;

const Sns = styled.div`
    color: #787777;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
`;

const Profile = styled.img`
    width: 4rem;
    height: 4rem;
    border: 0.05rem solid #c0c0c0;
    border-radius: 100%;
`;

//누르면 나오는거
const DropDown = styled.button`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

const ListContainer = styled.span`
  background-color: white;
  border-radius: 0.3rem;
  border: solid 0.05rem gray;
  position: absolute;
  display:none;
  ${DropDown}:active & {
    display:grid;
    grid-template-columns:repeat(4, 1fr);
  }
  ${DropDown}:focus & {
    display:grid;
    grid-template-columns:repeat(4, 1fr);
  }
`;

const PickColor = styled.div`
    ${colortyles}
    margin-top: 1rem;
    width: 2rem;
    height: 2rem;
    border: solid 0.01rem rgb(231, 231, 231);
`;

function Modify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [nicknameOrigin, setnicknameOrigin] = useState("");
    const [nicknameCheck, setNicknameCheck] = useState(true);
    const [myColor, setMyColor] = useState(1);
    const [socialId, setSocialId] = useState("");
    const [fileIdx, setFileIdx] = useState();
    const [base64, setBase64] = useState("");

    const myIdx = useSelector((state)=>state.USER.myIdx);

    //정보 가져오기
    useEffect(()=>{
        getUserInfo();
    }, [])

    console.log(myColor);

    //닉네임 입력중
    const handleNickname = e => {
        setNicknameCheck(false);
        setNickname(e.target.value);
    }

   //색 선택하기
    const handlePickColor = (e) =>{
        setMyColor(e);
    }

    //닉네임 중복 확인
    const handleCheckNick = e => {
        if(nickname === ""){
            alert("닉네임 입력해주세요.");
        } else if(nicknameOrigin === nickname) {
            alert("원래 닉네임 입니다.");
        }else{
            getNick();                                                            
        }
    }

  //닉네임 중복 확인 비동기 통신
    const getNick = async() => { 
        try {
            const response = await api.get(`/users/check-nickname/${nickname}`, null);
            
            if(response.data.data.available){
                setNicknameCheck(true);
                alert("사용 가능한 닉네임입니다.");
            } else{
                alert("이미 존재하는 닉네임입니다.");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
  }


    //닉네임 수정하기
    const handleModify = e => {
        if(nicknameOrigin === nickname) {
            setNicknameCheck(true);
        }

        if(nickname === ""){
            alert("닉네임 입력해주세요.");
        } else if(!nicknameCheck){
            alert("닉네임 중복 확인을 완료해주세요.");                                                                             
        } else {
            sendInfo();
        }
    }

    //현재 accesstonken에 맞는 user 정보 불러오기
    const getUserInfo = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/information`);
            console.log("getUserInfo")
            console.log(response)
            if(response.data.data !== null){
                setEmail(response.data.data.email);
                setNickname(response.data.data.nickname);
                setnicknameOrigin(response.data.data.nickname);
                setMyColor(response.data.data.emoteColorIdx);
                setSocialId(response.data.data.socialId);
                setBase64( "data:image/" + response.data.data.extension + ";base64," + response.data.data.base64);
            }
            
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    //정보 수정하기
    const sendInfo = async() => {
        try {
            const response = await api.patch(`/users`, {
                nickname: nickname,
                emoteColorIdx : myColor,
                fileIdx: fileIdx
            });
            
            window.location.replace("/accounts/edit")
             
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    
////////////파일 업로드하기(프로필 업로드)////////////
    const fileInput = useRef(null);
  
    const handleButtonClick = () => {
        fileInput.current.click();
    };
    
    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function(){
            console.log('result', reader.result)
            const base64 = reader.result
            setBase64(base64)
            fileUpload(base64)
        }
        
    };

    const fileUpload = async(base64File) =>{
        try {
            const response = await api.post(`/file`, 
            {
                originalFile:`${Date.now()}_${myIdx}_profile.webp`,
                base64:base64File.split(',')[1],
            });
            
            if(response.data.success){
                console.log(response)
                setFileIdx(response.data)
                // dispatch(SAVE_profileImgIdx(response.data))
            } else{
                console.log("실패했지렁")
            }
             
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

////////////////////////////////////파일 업로드////////////

//사진 프로필 삭제하기
    const handleProfileDelete = e => {
        setFileIdx(110);
    }

    return(
        <div className="box">
            {(socialId === "@mindder")? <Sns></Sns>: null}
            <div className="col-12">
            <label className="form-label"> 사진</label>
            <div className="center-container">
                <Profile scr={base64}/>
            </div>
            <div className="logo-container">
                <input className="white-black-line-btn" type="button" value="수정" onClick={handleButtonClick}/>
                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }} />

                <input className="white-black-line-btn" type="button" value="삭제" onClick={handleProfileDelete} />
            </div>
        </div>
        <div className="col-12">
                <label className="form-label"> 이메일</label>
                <p className="email-Text"> {email} </p>
        </div>
            <label htmlFor="nickname" className="form-label"> 닉네임</label>
            <div className="logo-container">
                <input value={nickname|| ''} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleNickname}/>
                <input className="white-black-line-btn" type="button" value="중복 확인" onClick={handleCheckNick}/>
            </div>
        {
        (socialId === "@mindder")? 
        <div className="col-12">
            <label className="form-label">비밀번호</label>
            <div className="center-container">  
            <input className="white-black-line-btn" type="button" value = "비밀번호 수정"
              onClick={() => {
                  navigate("/accounts/password/change");
              }}/>
          </div>
        </div>
        :
        null
        }
        <div className="col-12">  
            <label className="form-label">나의 색</label>
            <DropDown>
                <PickColor mypick = {Colors16[myColor-1].code}/>
                <ListContainer>
                    {Colors16.map((color)=>(
                        <ColorStyled mypick={color.code} onClick={()=>handlePickColor(color.id)} key={color.id}/>
                    ))} 
                </ListContainer>
            </DropDown>     
        </div>
        <div className="center-container">
        <input className="maincolor-white-btn" type="button" value="수정하기" onClick = {handleModify}/>
        </div>
    </div>
    );
}

export default Modify;