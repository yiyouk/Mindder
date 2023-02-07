import axios from "axios";
import { getCookie, removeCookie } from "./cookie";

// axios.create는 나만의 엑시오스 인스턴스를 만드는 메서드이다.
const instance = axios.create({
  baseURL: "http://mindder.me:8888/dev"
});


/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
instance.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const token = getCookie("is_login");
    try {
      config.headers.access_token = token;
      return config;
    } catch (err) {
      console.error('[_axios.interceptors.request] config : ' + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);


/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
 instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error) => {
    if(error.response.status === 401){
      alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.")
      removeCookie("is_login")
      window.location.replace("/")
    }
    return Promise.reject(error);
  }
);

export default instance;