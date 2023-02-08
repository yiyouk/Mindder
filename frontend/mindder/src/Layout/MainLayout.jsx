import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em 0em 0em 0em;
`;

const Body = styled.div`
    padding: 1em 0 1.2em 0;
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow:scroll;
`

const MainLayout =()=>{
    return(
        <Bodysuit>
            <HeaderBar/>
            <Body>
                <Outlet/>
            </Body>
            <NaviBar/>
        </Bodysuit>
    )

}

export default MainLayout;