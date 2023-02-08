import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Face11 from "../../assets/images/happy.png"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`


const Container = styled.div`
    width: 360px;
    max-width: 720px;
    display: flex;
    align-items: center;
    justify-content: center;

`

// -- 월 이동 버튼 스타일 -- //
const CalBtn = styled.div`
  border: none;
  margin: 5px 5px 10px 5px;
  height: 20px;
  align-self: center;
  background: none;
  cursor: pointer;
  color: #7767FD;
  font-weight: bold;
  text-shadow: 0px 2px 1px #afafaf;

`

// -- 월~일 요일 스타일 -- //
const CalWeek = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  width:350px;
  grid-template-columns: repeat(7, 1fr);

  & > * {
    text-align: center;
    width:100%;

    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }
  
`

// -- 일 스타일 -- //
const CalDate = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  width:350px;
  grid-template-columns: repeat(7, 1fr);

  & > * {
    height: 50px;
    text-align: center;
    width:100%;

    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }
  
`

const DateStyle = styled.div`
  & > img{
    width: 40px;
    height: 40px;
  }
`

const ControlBox = styled.select`
  border: 2px solid #7767FD; 
  align-items: center;
  display: flex;
  border-radius: 10px;

`

const DayStyle = styled.div`
  margin: 5px;
`

const Calendar = () => {

  // -- 오늘 날짜 -- //
  const date = new Date();
  const year = date.getFullYear();        // 오늘 년도
  const month = date.getMonth() + 1;      // 오늘 월
  const today = date.getDate();           // 오늘 일
  const day = date.getDay();              // 오늘 요일

  const week = ["일", "월", "화", "수", "목", "금", "토"];            // 일주일

  const [selectedYear, setSelectedYear] = useState(year);                    // 현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(month);                 // 현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜


  // useCallback  SelectedMonth 변수값이 변할때만 재정의
  // -- 이전 달 보기 버튼 -- //
  const prevMonth = useCallback(() => {
    setSelectedYear(selectedMonth === 1 ? selectedYear - 1 : selectedYear);
    setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1);
  }, [selectedMonth]);


  // -- 다음 달 보기 버튼 -- //
  const nextMonth = useCallback(() => {
    setSelectedYear(selectedMonth === 12 ? selectedYear + 1 : selectedYear);
    setSelectedMonth((selectedMonth % 12) + 1);
  }, [selectedMonth]);

  // - 1월부터 12월까지 선택 - //
  const monthControl = useCallback(() => {
    const monthArr = [];
    for (let i = 1; i < 13; i++) {
      monthArr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <ControlBox
        onChange={changeSelectMonth}
        value={selectedMonth}
      >
        {monthArr}
      </ControlBox>
    );
  }, [selectedMonth]);

  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  // - 10년전부터 10년후까지 선택 - //
  const yearControl = useCallback(() => {
    const yearArr = [];
    const startYear = year - 10;
    const endYear = year + 10;
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <ControlBox
        onChange={changeSelectYear}
        value={selectedYear}
      >
        {yearArr}
      </ControlBox>
    );
  }, [selectedYear]);


  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  // - 일부터 월까지 요일 반환 - //
  const returnWeek = useCallback(() => {
    const weekArr = week.map((item, idx) => {
      return <div key={idx}>{item}</div>
    });
    return weekArr;
  }, []);

  const returnDay = useCallback(() => {
    const dayArr = [];
    
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      const emoDay = true;
      if (week[day] === nowDay) {
        console.log(week[day], nowDay)
        for (let i = 0; i < dateTotalCount; i++) {
          console.log(i)
          dayArr.push(
            <DateStyle
              key={i + 1}
            >
              {emoDay
              ? <img src={Face11} alt="감정" />
              : <div>{i + 1}</div>
              }
              
            </DateStyle>
          );
        }
      } else {
        dayArr.push(<DateStyle></DateStyle>);
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  return (
    <Wrapper>
      <Container>
        <CalBtn onClick={prevMonth}>◀</CalBtn>
          <DayStyle>{yearControl()}</DayStyle> 
          <DayStyle>년</DayStyle> 
          <DayStyle>{monthControl()}</DayStyle> 
          <DayStyle>월</DayStyle>
        <CalBtn onClick={nextMonth}>▶</CalBtn>
      </Container>
      <Container>
        <CalWeek>{returnWeek()}</CalWeek>
      </Container>
      <Container>
        <CalDate>{returnDay()}</CalDate>
      </Container>
    </Wrapper>
  );
};

export default Calendar;