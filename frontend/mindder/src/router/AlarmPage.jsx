import React, {useState, useEffect} from "react";
import styled from "styled-components";
import AlarmItem from "../commons/list/AlarmItem"
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { SAVE_alarmCount } from "../redux/reducers";


const Wrapper = styled.div`
    max-width: 21.5rem;
    width: 21.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const DelBtn = styled.div`
    color: #7767FD;
    align-self: end;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
`;

function AlarmPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myAlarm = useSelector((state)=>state.USER.alarmCount);
    const [ Alarms, setAlarm ] = useState([]);
    const [ alarmCount, setAlarmCount ] = useState(myAlarm);
    const myIdx = useSelector((state)=>state.USER.myIdx);
   
    const getAlarm = async()=>{
        try {
            const response = await api.get(`/alarms`);
            if(response.data.success){
                setAlarm(response.data.data)
                
                setAlarmCount()
                // console.log(response.data.data);
            }
        } catch(err) {
            // console.log(err)
        }
    }

    const getData = (number) => {
        setAlarmCount(number);
        dispatch(SAVE_alarmCount(number))
    }

    //정보 가져오기
    useEffect(()=>{
        getAlarm()
        // console.log(alarmCount)
    }, [alarmCount])

    const AlarmDelete = async() => {
        try {
            // console.log("전체삭제")
            const response = await api.delete(`/alarms/all`);
            if(response.data.success){
                // console.log("성공")
                setAlarmCount(0)
                dispatch(SAVE_alarmCount(0))
            } else {
            }
        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }

    return (
        <Wrapper>
            {Alarms.length === 0? (
                <>

                    <div>알림이 없습니다.</div>
                </>
                ) : (
                <>
                  <DelBtn onClick={AlarmDelete}>알림 전체 삭제</DelBtn>
                    {Alarms.map((alarm, idx) => {
                        if (alarm.sendUserIdx !== myIdx){
                        return(
                                <AlarmItem getData={getData} alarmCount={Alarms?Alarms.length:0} alarm={alarm} userIdx={alarm.sendUserIdx} key={idx}/>
                        )}
                        })}
                </>
            )} 
        </Wrapper>
    );
}

export default AlarmPage;
