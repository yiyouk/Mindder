// 카카오 로그인 키

const CLIENT_ID = "0d2c29aab3ff2236ab9808ecb73e15e7";
const REDIRECT_URI =  "https://mindder.me/users/social/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;