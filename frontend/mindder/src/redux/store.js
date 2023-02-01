import { configureStore, createSlice } from '@reduxjs/toolkit'
// import {tokenSlice} from './Auth';

export const Emoticons = [
  {
      id:1,
      name:"화남",
  },
  {
      id:2,
      name:"기쁜",
  },
  {
      id:3,
      name:"외로움",
  },
  {
      id:4,
      name:"우울",
  },
  {
      id:5,
      name:"피곤",
  },
  {
      id:6,
      name:"만족",
  },
  {
      id:7,
      name:"행복",
  },
  {
      id:8,
      name:"슬픔",
  },
  {
      id:9,
      name:"불안",
  },
  {
      id:10,
      name:"아픔",
  },
  {
      id:11,
      name:"불쾌",
  },
  {
      id:12,
      name:"실망",
  },
  {
      id:13,
      name:"긴장",
  },
  {
      id:14,
      name:"신남",
  },
  {
      id:15,
      name:"지루함",
  },
  {
      id:16,
      name:"기타",
  },
]

export const Colors16 = [
  {
    id:1,
    name:"빨강",
    code:"#F56161"
  },
  {
    id:2,
    name:"파랑",
    code:"#82AAE3"
  },
  {
    id:3,
    name:"연두",
    code:"#B6E2A1"
  },
  {
    id:4,
    name:"베이지",
    code:"#F8EDE3"
  },
  {
    id:5,
    name:"갈색",
    code:"#AD8270"
  },
  {
    id:6,
    name:"회색",
    code:"#B2B2B2"
  },
  {
    id:7,
    name:"분홍",
    code:"#FC9CBB"
  },
  {
    id:8,
    name:"남색",
    code:"#3A4F7A"
  },
  {
    id:9,
    name:"연분홍",
    code:"#FFC7C7"
  },
  {
    id:10,
    name:"노랑",
    code:"#F8F388"
  },
  {
    id:11,
    name:"주황",
    code:"#FFCC80"
  },
  {
    id:12,
    name:"보라",
    code:"#BA94D1"
  },
  {
    id:13,
    name:"하양",
    code:"#FFFFFF"
  },
  {
    id:14,
    name:"하늘",
    code:"#7FE9DE"
  },
  {
    id:15,
    name:"보라",
    code:"#863A6F"
  },
  {
    id:16,
    name:"검정",
    code:"#000000"
  },
]

const initialState = {
  emotagSrc:"/static/media/face2.66e6957fbe1fd4bfad8b.png",
  todayEmotion:null,
  todayColor:null,
  nickName:"",
  userIdx:null,
}

const userStateSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{
    SAVE(state, action){
      // console.log(action)
      switch (action.payload.case) {
        case "emoTag":
          state.todayEmotion = action.payload.selected
          console.log(`오늘의 감정 : ${state.todayEmotion}`)
          break;
        case "emoColor":
          state.todayColor = action.payload.selected
          console.log(`오늘의 감정색 : ${state.todayColor}`)
          break;
        case "imgSrc":
          state.emotagSrc = action.payload.selected
          console.log(`이미지url : ${state.emotagSrc}`)
          break;
        case "nickName":
          state.nickName = action.payload.selected
          console.log(`nickName : ${state.nickName}`)
          break;
        case "userIdx":
          state.userIdx = action.payload.selected
          console.log(`userIdx : ${state.userIdx}`)
          break;
        default:
          break;
      }
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
        SET_TOKEN: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        
        DELETE_TOKEN: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null
        },
    }
})


export const store = configureStore({reducer:{userState : userStateSlice.reducer, authToken : tokenSlice.reducer}});

export const userAction = userStateSlice.actions;
export const tokenAction = tokenSlice.actions;

export default store;