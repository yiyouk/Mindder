import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// -- 아이콘 이미지 import -- 
import SearchImg from "../../assets/images/icon1.png";
import FeedImg from "../../assets/images/icon2.png";
import HomeImg from "../../assets/images/icon3.png";
import MyPageImg from "../../assets/images/icon4.png";
import PostImg from "../../assets/images/icon5.png";

const Wrapper = styled.nav`
    height: 2.5em;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    background-color:white;
    align-items: center;
    display: flex;
    box-shadow: 0 -2px 2px 1px rgba(119, 103, 253, 0.15);
    width: 100vw;
`;

const NavMenu = styled.div`
    width: 20vw;
    text-align: center;
`

const Image = styled.img`
    width: 1.4rem;
    height: 1.4rem;
`

function NaviBar(props) {
    const navigate = useNavigate();
    const myIdx = useSelector((state)=>state.USER.myIdx);
    console.log(myIdx)
    return (
        <Wrapper>
            <NavMenu
                onClick={() => {
                    navigate("/search");
                }}>
                <Image src={SearchImg} alt="" />
            </NavMenu>
        
            <NavMenu
                onClick={() => {
                    navigate("/feeds");
                }}>        
                <Image src={FeedImg} alt="" />
            </NavMenu>

            <NavMenu
                onClick={() => {
                    navigate("/");
                }}>
                <Image src={HomeImg} alt="" />
            </NavMenu>
                        
            <NavMenu
                onClick={() => {
                    navigate(`/${myIdx}`);
                }}>   
                <Image src={MyPageImg} alt="" />
            </NavMenu>
            
            <NavMenu
                onClick={() => {
                    navigate("/post");
                }}>
                <Image src={PostImg} alt="" />
            </NavMenu>
        </Wrapper>
    );
}

export default NaviBar;