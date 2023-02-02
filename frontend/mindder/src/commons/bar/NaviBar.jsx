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
    position: fixed;
    bottom: 0;
    right: 0.03rem;
    /* width: 100rem; */
    height: 2.5rem;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-color:white;
    align-items: center;
    display: flex;
    box-shadow: 0 -2px 2px 1px rgba(119, 103, 253, 0.15);
    /* border:1px solid green; */
`;

const NavMenu = styled.div`
    width: 20vw;
    /* height: 10vh; */
    text-align: center;
    padding-left: 0px;
`

const Image = styled.img`
    width: 1.4rem;
    height: 1.4rem;
`

function NaviBar(props) {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated)

    return (
        <>
            {isLoggedIn ?    <Wrapper>
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
                    navigate("/user");
                }}>   
                <Image src={MyPageImg} alt="" />
            </NavMenu>
            
            <NavMenu
                onClick={() => {
                    navigate("/post");
                }}>
                <Image src={PostImg} alt="" />
            </NavMenu>
        
        </Wrapper> :  null}
        </>
    );
}

export default NaviBar;