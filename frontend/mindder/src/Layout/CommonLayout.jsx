import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: scroll;
    margin-bottom: 6vh;
`;

const Body = styled.div`
    padding: 3vh 0 5vh 0;
    display: flex;
    justify-content: center;
`

const Dumm = styled.div`
    height: 6vh;
    width: 100vw;;
`

const CommonLayout =()=>{
    return(
        <Wrapper>
            <HeaderBar/>
            <Body>
                <Outlet/>
            </Body>
            <Dumm/>
            <NaviBar/>
        </Wrapper>
    )

}

export default CommonLayout;