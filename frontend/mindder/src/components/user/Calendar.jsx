import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';
import '../../assets/css/calendar.css';
import Face11 from "../../assets/images/happy.png";

import api from "../../api/api";

function Cal() {
  const [emoDay, setEmoDay] = useState([]);

  const getEmoDay = async() => {
    const year = value.getFullYear()
    const month = value.getMonth() + 1
    console.log("달력입니다", year, month)
    try {
      const response = await api.get(`/my/calendars?year=${year}&month=${month}`);
      setEmoDay(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
}

//   const {data} = useQuery(["logDate", month], async() => {
//     const year = data.year
//     const month = data.month
//     console.log("달력입니다", year, month)
//     try {
//       const response = await api.get(`/my/calendars?year${year}=&month=${month}`);
      
//     } catch (error) {
//       console.log(error)
//     }
// })

  
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    getEmoDay()
    // console.log(value.getDate())
    // console.log('캘린더')
  }, [])
  return (
    <div>
      <Calendar 
        onChange={onChange} 
        value={value}
        formatDay = {(locale, date) => date.toLocaleString('en', {day: 'numeric'})}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        />

    </div>
  );
}
export default Cal;