import React, {useState, useEffect} from "react";
import styled from "styled-components";
import AlarmItem from "../commons/list/AlarmItem"
import { useSelector } from "react-redux";
import api from "../api/api";

const Wrapper = styled.div`
    max-width: 21.5rem;
    width: 21.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function AlarmPage(props) {
    const [ Alarms, setAlarm ] = useState([]);
    const [ alarmCount, setAlarmCount ] = useState(null);
    const myIdx = useSelector((state)=>state.USER.myIdx);
   
    const getAlarm = async()=>{
        try {
            const response = await api.get(`/alarms`);
            if(response.data.success){
                setAlarm(response.data.data)
                console.log(response.data.data);
            }
        } catch(err) {
            console.log(err)
        }
    }

    const getData = (number) => {
        setAlarmCount(number);
    }

    //정보 가져오기
    useEffect(()=>{
        getAlarm()
    }, [alarmCount])


    return (
        <Wrapper>
            {Alarms.length === 0? (
                <>
                    <div>알림이 없습니다.</div>
                </>
                ) : (
                <>
                    {Alarms.map((alarm, idx) => {
                        console.log(alarm.sendUserIdx)
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
