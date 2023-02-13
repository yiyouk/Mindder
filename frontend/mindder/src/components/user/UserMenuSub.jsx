import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Calendar from "./Calendar";
import CanvasAlbumList from "../../commons/list/CanvasAlbumList";
import {IoGridSharp, IoGridOutline} from "react-icons/io5";
import {BsCalendarCheck, BsCalendarCheckFill} from "react-icons/bs";

const Wrapper = styled.div`
    width: 21rem;
    display: flex;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;
`;

const Memu = styled.div`
    position: relative;
    bottom : 1rem;
    width: 6rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const CircleP = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    background-color: #7767FD;
    border: solid 0.1rem #7767FD;
`;

const CircleW = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: #ffffff;
    border: solid 0.1rem #7767FD;
`;


function UserMenu({isMine, list}) {
    const [kind, setKind] = useState(true);
    
    const onClick = () => {
        setKind(!kind);
    }

    return (
        <>
            {isMine ?
            <Wrapper>
                { kind ? <span>내 피드</span> : <span>감정 캘린더</span>}
                { kind ?
                <Memu>
                    <CircleP onClick={onClick}><IoGridSharp size="25" color="#ffffff"/></CircleP>
                    <CircleW onClick={onClick}><BsCalendarCheckFill size="22"  color="#7767FD"/></CircleW>
                </Memu>
                :
                <Memu>
                    <CircleW onClick={onClick}><IoGridOutline size="21" color="#7767FD"/></CircleW>
                    <CircleP onClick={onClick}><BsCalendarCheck size="24" color="#ffffff"/></CircleP>
                </Memu>
                }   
            </Wrapper>
            :
            null
            }
            <>
                { kind ?
                (!list || list.length === 0) ? 
                    <span>감정피드가 존재하지 않습니다.</span>
                    :
                    <CanvasAlbumList size="m" list={list} up={true}/>                
                :
                <Calendar/>
                }
            </>
        </>
    );
}

export default UserMenu;