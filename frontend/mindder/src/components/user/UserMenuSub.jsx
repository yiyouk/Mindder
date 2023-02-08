import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    

`;

const CalendarBtn = styled.a`
    align-self: end;
    margin: 10px;
    border-width: 1px;
    cursor: pointer;
    
`;

const MyFeedBtn = styled.a`
    align-self: end;
    margin: 10px;
    border-width: 1px;
    cursor: pointer;

`;


function UserMenu(props) {
    const navigate = useNavigate();
    const myIdx = useSelector((state)=>state.USER.myIdx);
    
    return (
        <Wrapper>
            <MyFeedBtn onClick={() => {
                navigate(`/${myIdx}/`)}}>
                    내 피드
            </MyFeedBtn>
            
            <CalendarBtn onClick={() => {
                navigate(`/calendar`)}}>
                    감정달력
            </CalendarBtn>

        </Wrapper>
    );
}

export default UserMenu;