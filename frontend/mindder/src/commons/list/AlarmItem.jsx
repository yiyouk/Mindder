import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ProfileImage from "../../commons/ui/ProfileImage";

import dayjs from 'dayjs';
import api from "../../api/api";
import { AlarmCheck } from "../bar/HeaderBar";

const Wrapper = styled.div`
    display: flex;
    padding: 0.6rem 0rem;
    align-items: center;
    max-width: 21rem;
    background: white;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    margin: 0 0 0 1rem;
`;

const SideContainer = styled.div`
    width: 16em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ContentText = styled.div`
    max-width: 17rem;
    color: rgb(67, 67, 67);
    font-size: 0.75rem;
    padding: 0rem 0.2rem 0rem 0rem;
    display:flex;
`;
const TextDeco = styled.span`
    font-weight: bold;
    color: #7767FD;
    cursor: pointer;
`
const DelAlarm = styled.div`
    font-size: 0.8rem;
    color: rgb(67, 67, 67);
    cursor: pointer;
`
const Date = styled.span`
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
    margin-bottom: 0.1rem;
`

const Container = styled.div`
    display: flex;
    background: white;
    
`
const ImgStyle = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0.2rem;
  border: 0.02rem solid rgba(219, 219, 219, 0.3);
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(219, 219, 219, 0.3);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`

function AlarmItem({alarm, userIdx, getData, alarmCount}) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/f/${alarm.feedIdx}`);
        removeAlarm()
      };

    // 알람 확인 표시 제거
    const removeAlarm = async() => {
        try {
            const response = await api.patch(`/alarms/${alarm.alarmIdx}`)
            
            if(response.data.success){
                console.log(response)
            }
        } catch (e) {
            console.error(e);
        }
    }

    // 알람 삭제
    const deleteAlarm = async() => {
        try {
            const response = await api.delete(`/alarms/${alarm.alarmIdx}`)
            if(response.data.success){
                getData(alarmCount-1)
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
            <Wrapper>
                <Container>
                    {alarm.read === false?                        
                        <AlarmCheck></AlarmCheck>
                        :
                        null
                    }
                    <div  onClick={removeAlarm}>
                        <ProfileImage extension={alarm.extension} size = "s" userIdx={userIdx} imgSrc={alarm.base64}/>
                    </div>

                    <Main>
                        <SideContainer>
                                <Date>{dayjs(alarm.updateDate).get('year')}년 {dayjs(alarm.updateDate).get('month') + 1}월 {dayjs(alarm.updateDate).get('date')}일</Date>
                        </SideContainer>
                        {{ 
                            1:<>
                                <ContentText>{alarm.nickname}님이 회원님을 팔로우합니다.</ContentText>
                              </>,
                            2:<>
                                <ContentText>
                                    <div>{alarm.nickname}님이 회원님의 <TextDeco onClick={onClick}>게시글</TextDeco>에 댓글을 남겼습니다.</div>
                                    <ImgStyle src={"data:image/" + alarm.feedExtension + ";base64," + alarm.feedBase64} onClick={onClick}/>
                                </ContentText>
                                
                              </>,
                            3:<>
                                <ContentText>
                                    <div>{alarm.nickname}님이 회원님의 <TextDeco onClick={onClick}>게시글</TextDeco>에 감정을 표현했습니다.</div> 
                                    <ImgStyle src={"data:image/" + alarm.feedExtension + ";base64," + alarm.feedBase64} onClick={onClick}/>
                                </ContentText>
                              </>
                        }[alarm.alarmType]}
            
                    </Main>
                </Container>
                <DelAlarm onClick={deleteAlarm}>x</DelAlarm>
            </Wrapper>
    );
}

export default AlarmItem;
