import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Body = styled.div`
    padding: 3vh 0 5vh 0;
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: center;
`

const Scroll = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CommonLayout =()=>{
    return(
        <Wrapper>
            <Scroll>
                <HeaderBar/>
                <Body>
                    <Outlet/>
                </Body>
            </Scroll>
            <NaviBar/>
        </Wrapper>
    )

}

export default CommonLayout;