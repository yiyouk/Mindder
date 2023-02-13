// 소셜로그인 시 리다이렉트될 화면 컴포넌트


import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const KakaoAuthRedirect = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code)


  useEffect( () => {

    // 1.여기서 axios로 백엔드에 보내서 엑세스 토큰받아옴
    // 2. 쿠키에 토큰 저장후 메인화면으로 리다이렉트
    // kakaoLogin(code)
  }, []);

  return (
    <>
      <h1>To. 백엔드</h1>
      <h2>인가코드를 받으면 엑세스토큰을 주시면 돼요</h2>
      <h2>그럼, 기다릴게요.</h2>
    </>
  )
};

// const kakaoLogin = (code) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "GET",
//       url: `http://3.35.208.142/oauth/callback/kakao?code=${code}`,
//     })
//       .then((res) => {
//         console.log(res); // 토큰이 넘어올 것임
        
//         const ACCESS_TOKEN = res.data.accessToken;
        
//         localStorage.setItem("token", ACCESS_TOKEN);    //예시로 로컬에 저장함    
        
//         history.replace("/main") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        
//         }.catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
//         }
//     }
// };

export default KakaoAuthRedirect;