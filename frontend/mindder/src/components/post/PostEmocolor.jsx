import React, {useState} from "react";
import styled from "styled-components";
import EmoHeader from "./EmoHeader";
import TodayEmotion from "./TodayEmotion";
import EmoColors from "./EmoColors";
import { Wrapper } from "./PostEmotag";
import { CardContainer } from "./PostEmotag";
import { Colors16 } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/store";


function PostEmocolor(props){
  const selectedSrc = useSelector((state)=>state.userState.emotagSrc)
  const selectedEmo = useSelector((state)=>state.userState.todayEmotion)
  const dispatch = useDispatch()

  const [imgSrc, setImgSrc] = useState(selectedSrc)

  const onClick = (e) => {
    const name = e.currentTarget.id
    const updatedSrc = require(`../../assets/images/mindder_bear/${selectedEmo}/${name}.png`)
    setImgSrc(updatedSrc)
    dispatch(userAction.SAVE({selected:name, case:"emoColor"}))
  }
  return (
    <Wrapper>
      <EmoHeader text="감정의 색을 채워주세요"/>
      <TodayEmotion
      imgSrc={imgSrc}
      />
      <CardContainer columnGap={1}>
        {Colors16.map((color)=>(
          <div onClick={(e)=>{onClick(e)}} id={color.name}>
            <EmoColors
            key={color.id} colorCode={color.code} colorName={color.name}
            />
          </div>
        ))}
      </CardContainer>
    </Wrapper>
  )
}

export default PostEmocolor;