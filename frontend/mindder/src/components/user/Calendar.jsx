import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import api from "../../api/api";

import BearFace from "../../assets/images/face_none.png";
import '../../assets/css/calendar.css';

function Cal() {
    const navigate = useNavigate();
    const [loading, setLoding] = useState(false);
    const [value, onChange] = useState(new Date());
    const [emoDay, setEmoDay] = useState({});

    const getEmoDay = useCallback(async() => {
        const year = value.getFullYear()
        const month = value.getMonth() + 1
       
        try {
            const response = await api.get(`/my/calendars?year=${year}&month=${month}`);
            // setEmoDay(await response.data.data)
            const emoDate = response.data.data
            for (const key in emoDate) {
                emoDay[emoDate[key].calendarDate] = `data:image/${emoDate[key].extension};base64,${emoDate[key].base64}`
            }
            setLoding(true);
            // console.log(emoDay)
            // for (const key in emoDay)
        } catch (error) {
            console.log(error)
            navigate("/error");
        }
    })
    
    // 곰돌이 색이름, 감정이름 받아서 이미지 수정하기
    const test = (date)=>{
        if (!emoDay) {
            return(
                <div>
                    <img src={BearFace} alt="데이터없어요" style={{width: '35px', height: '35px'}}/>
                </div>
            )
        } else {
            // console.log(emoDay[dayjs(date).format('YYYY-MM-DD')])
            // const bear= require(`../../assets/images/mindder_bear/${Emoticons[emoteIdx].name}/${Colors16[emoteColorIdx].name}.webp`)
            if (!emoDay[dayjs(date).format('YYYY-MM-DD')]) {
                return(
                    <div>
                        <img src={BearFace} alt="데이터없어요" style={{width: '35px', height: '35px'}}/>
                        {/* <img src={imgSrc} alt="감정태그" /> */}
                    </div>
                    )
            } else {
                return(
                    <div>
                        <img src={emoDay[dayjs(date).format('YYYY-MM-DD')]} style={{width: '35px', height: '35px'}}/>
                    </div>
                )
            }
        }
    }


    useEffect(() => {
        getEmoDay()
    }, [emoDay])


    return (
        <div>
            <Calendar 
                onClickDay={null}
                onChange={onChange} 
                value={value}
                formatDay = {(locale, date) => date.toLocaleString('en', {day: 'numeric'})}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                tileContent = {({ date })=>test(date)}
            />
        </div>
    );
}
export default Cal;