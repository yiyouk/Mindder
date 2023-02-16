// 카카오 로그인 키
export const CLIENT_ID = "dc63597430966307c80d8e0e8c0d9b8a";
export const REDIRECT_URI =  "https://mindder.me/users/social/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


// 네이버 로그인 키
const NAVER_CLIENT_ID = "Q7bNqWul_gXvDgRiM_3g"
// const NAVER_CLIENT_SECRET = "UGUTNXiZIo"
const NAVER_REDIRECT_URI = "https://mindder.me/users/social/naver"
export const NAVER_STATE_TOKEN = "STATE_MINDDER"
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE_TOKEN}`
// export const NAVER_ACCESSTOKEN_URL = code => `https://nid.naver.com/oauth2.0/token?client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&grant_type=authorization_code&state=${NAVER_STATE_TOKEN}&code=${code}`