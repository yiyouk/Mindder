import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// -- 아이콘 이미지 import -- 
import { BiSearch } from "react-icons/bi";
import { MdOutlinePalette } from "react-icons/md";
import { RiHome6Fill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlinePlusCircle } from "react-icons/hi";

const Wrapper = styled.nav`
    position: fixed;
    bottom: 0vh;
    height: 7vh;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    background-color: white;
    align-items: center;
    display: flex;
    box-shadow: 0 -2px 2px 1px rgba(119, 103, 253, 0.15);
    width: 100vw;
`;

const NavMenu = styled.div`
    width: 20vw;
    text-align: center;
`

function NaviBar(props) {
    const navigate = useNavigate();
    const myIdx = useSelector((state)=>state.USER.myIdx);

    return (
        <Wrapper>
            <NavMenu
                onClick={() => {
                    navigate("/search");
                }}>
                <BiSearch color="#7767FD" size="2rem"/>
            </NavMenu>
        
            <NavMenu
                onClick={() => {
                    navigate("/feeds");
                }}>        
                <MdOutlinePalette color="#7767FD" size="2rem"/>
            </NavMenu>

            <NavMenu
                onClick={() => {
                    navigate("/");
                }}>
                <RiHome6Fill color="#7767FD" size="2.1rem"/>
            </NavMenu>
                        
            <NavMenu
                onClick={() => {
                    navigate(`/${myIdx}`);
                }}>   
                <AiOutlineUser color="#7767FD" size="2rem"/>
            </NavMenu>
            
            <NavMenu
                onClick={() => {
                    navigate("/post");
                }}>
                <HiOutlinePlusCircle color="#7767FD" size="2rem"/>
            </NavMenu>
        </Wrapper>
    );
}

export default NaviBar;