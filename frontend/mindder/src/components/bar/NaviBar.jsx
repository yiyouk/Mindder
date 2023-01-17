import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

// -- 아이콘 이미지 import -- 
import SearchImg from "../../images/icon1.png"
import FeedImg from "../../images/icon2.png"
import HomeImg from "../../images/icon3.png"
import MyPageImg from "../../images/icon4.png"
import PostImg from "../../images/icon5.png"


const Wrapper = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

    align-items: center;
    display: flex;
    /* box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.3); */
    box-shadow: 0 -5px 5px 2px rgba(119, 103, 253, 0.2);
`;

const NavMenu = styled.div`
    width: 20vw;
    text-align: center;
    padding-left: 0px;
`

function NaviBar(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <NavMenu
                onClick={() => {
                    navigate("/search");
                }}>
                <img src={SearchImg} alt="" />
            </NavMenu>
        
            <NavMenu
                onClick={() => {
                    navigate("/feeds");
                }}>        
                <img src={FeedImg} alt="" />
            </NavMenu>

            <NavMenu
                onClick={() => {
                    navigate("/");
                }}>
                <img src={HomeImg} alt="" />
            </NavMenu>
                        
            <NavMenu
                onClick={() => {
                    navigate("/user");
                }}>   
                <img src={MyPageImg} alt="" />
            </NavMenu>
            
            <NavMenu
                onClick={() => {
                    navigate("/post");
                }}>
                <img src={PostImg} alt="" />
            </NavMenu>
        
        </Wrapper>
    );
}

{/* const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`; */}


// function NaviBar(props) {
//     const navigate = useNavigate();

//     return (
//         <Wrapper>
//             <Container>
//                 <Button
//                     title="검색"
//                     onClick={() => {
//                         navigate("/post-write");
//                     }}
//                 />
//                 <Button
//                     title="실시간"
//                     onClick={() => {
//                         navigate("/post-write");
//                     }}
//                 />
//                 <Button
//                     title="홈"
//                     onClick={() => {
//                         navigate("/");
//                     }}
//                 />
//                 <Button
//                     title="마이페이지"
//                     onClick={() => {
//                         navigate("/my-page");
//                     }}
//                 />
//                 <Button
//                 title="그리기"
//                 onClick={() => {
//                     navigate("/post-draw-page");
//                 }}
//                 />   
//             </Container>
//         </Wrapper>
//     );
// }

export default NaviBar;
