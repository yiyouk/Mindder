// 카카오 로그인 키

const CLIENT_ID = "dc63597430966307c80d8e0e8c0d9b8a";
const REDIRECT_URI =  "https://mindder.me/users/social/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;