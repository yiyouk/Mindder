import { createSlice, combineReducers } from "@reduxjs/toolkit";

export const Emoticons = [
  {
    id : 0,
    name:"더미",
    en:"dumm"
  },
  {
      id:1,
      name:"화남",
      en:"aggro",
  },
  {
      id:2,
      name:"기쁜",
      en:"joy",
  },
  {
      id:3,
      name:"외로움",
      en:"loneliness",
  },
  {
      id:4,
      name:"우울",
      en:"depressed",
  },
  {
      id:5,
      name:"피곤",
      en:"fatigue",
  },
  {
      id:6,
      name:"만족",
      en:"satisfied",
  },
  {
      id:7,
      name:"행복",
      en:"happiness",
  },
  {
      id:8,
      name:"슬픔",
      en:"sadness",
  },
  {
      id:9,
      name:"불안",
      en:"unrest",
  },
  {
      id:10,
      name:"아픔",
      en:"pain",
  },
  {
      id:11,
      name:"불쾌",
      en:"discomfort",
  },
  {
      id:12,
      name:"실망",
      en:"disappointed",
  },
  {
      id:13,
      name:"긴장",
      en:"nervous",
  },
  {
      id:14,
      name:"신남",
      en:"excited",
  },
  {
      id:15,
      name:"지루함",
      en:"boredom",
  },
  {
      id:16,
      name:"기타",
      en:"etc",
  },
]

export const Colors16 = [
  {
    id : 0,
    name:"더미",
    code:"#FFFFFFF",
    en:"dumm",
  },
  {
    id:1,
    name:"빨강",
    code:"#F56161",
    en:"red",
  },
  {
    id:2,
    name:"파랑",
    code:"#82AAE3",
    en:"blue",
  },
  {
    id:3,
    name:"연두",
    code:"#B6E2A1",
    en:"green",
  },
  {
    id:4,
    name:"베이지",
    code:"#F8EDE3",
    en:"beige",
  },
  {
    id:5,
    name:"갈색",
    code:"#AD8270",
    en:"brown",
  },
  {
    id:6,
    name:"회색",
    code:"#B2B2B2",
    en:"gray",
  },
  {
    id:7,
    name:"분홍",
    code:"#FC9CBB",
    en:"pink",
  },
  {
    id:8,
    name:"남색",
    code:"#3A4F7A",
    en:"navy",
  },
  {
    id:9,
    name:"연분홍",
    code:"#FFC7C7",
    en:"peach",
  },
  {
    id:10,
    name:"노랑",
    code:"#F8F388",
    en:"yellow",
  },
  {
    id:11,
    name:"주황",
    code:"#FFCC80",
    en:"orange",
  },
  {
    id:12,
    name:"연보라",
    code:"#BA94D1",
    en:"purple",
  },
  {
    id:13,
    name:"하양",
    code:"#FFFFFF",
    en:"white",
  },
  {
    id:14,
    name:"하늘",
    code:"#7FE9DE",
    en:"mint",
  },
  {
    id:15,
    name:"보라",
    code:"#863A6F",
    en:"mauve",
  },
  {
    id:16,
    name:"검정",
    code:"#000000",
    en:"black",
  },
]

const initialState = {
  emotagSrc:'/static/media/face16.9ddc3c40a4f252ded077.webp',
  todayEmotion:null,
  todayColor:null,
  nickName:"",
  myIdx:null,
  otherUserIdx:null,
  followingList:[],
  followingCount:null,
  followerCount:null,
  userDrawing:null,
  profileImg:null,
  customTag:null,
  profileImgFileIdx:null,
}

const userStateSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    SAVE_todayEmotion(state, action){
      state.todayEmotion = action.payload
      console.log(`오늘의 감정 : ${state.todayEmotion}`)
    },
    SAVE_todayColor(state, action){
      state.todayColor = action.payload
      console.log(`오늘의 감정색 : ${state.todayColor}`)
    },
    SAVE_emotagSrc(state, action){
      state.emotagSrc = action.payload
      console.log(`이미지src : ${state.emotagSrc}`)
    },
    SAVE_nickName(state, action){
      state.nickName = action.payload
      console.log(`nickName : ${state.nickName}`)
    },
    SAVE_myIdx(state, action){
      state.myIdx = action.payload
      console.log(`myIdx : ${state.myIdx}`)
    },
    SAVE_otherUserIdx(state, action){
      state.otherUserIdx = action.payload
      console.log(`otherUserIdx : ${state.otherUserIdx}`)
    },
    SAVE_followingList(state, action){
      state.followingList.push(action.payload) 
      console.log(`followingList : ${state.followingList}`)
    },
    SAVE_profileImg(state, action){
      state.profileImg = action.payload
      console.log(`profileImg : 저장 성공`)
    },
    SAVE_followingCount(state, action){
      state.followingCount = action.payload
      console.log(`followingCount : ${state.followingCount}`)
    },
    SAVE_followerCount(state, action){
      state.followerCount = action.payload
      console.log(`followerCount : ${state.followerCount}`)
    },
    SAVE_userDrawing(state, action){
      state.userDrawing = action.payload
      console.log(`유저가 그린 그림 : 저장 성공`)
    },
    SAVE_customTag(state, action){
      state.customTag = action.payload
      console.log(`기타 감정 : ${state.customTag}`)
    },
    SAVE_profileImgFileIdx(state, action){
      state.profileImgFileIdx = action.payload
      console.log(`프로필 이미지 저장성공 : ${state.profileImgFileIdx}`)
    },
  }
})

const TOKEN_TIME_OUT = 60*30;

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        authenticated: false,
        accessToken: null,
        expireTime: null
    },

    reducers: {
        SET_TOKEN(state, action){
            console.log(`SET_TOKEN : ${state}`)
            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        DELETE_TOKEN(state, action){
            console.log(`DELETE_TOKEN : ${state}`)
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null;
        },
    }
})

export const rootReducer = combineReducers(
  {
    USER:userStateSlice.reducer,
    TOKEN:tokenSlice.reducer,
  }
)

export const {SAVE_todayEmotion, SAVE_todayColor, SAVE_emotagSrc, SAVE_nickName, SAVE_myIdx, SAVE_otherUserIdx, SAVE_userDrawing, SAVE_followerCount, SAVE_followingCount, SAVE_profileImg, SAVE_followingList,SAVE_customTag, SAVE_profileImgFileIdx } = userStateSlice.actions;
export const {SET_TOKEN, DELETE_TOKEN} = tokenSlice.actions;