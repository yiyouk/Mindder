import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

const NoNaviLayout =()=>{
    return(
        <Bodysuit>
            <HeaderBar/>
            <Outlet/>
        </Bodysuit>
    )

}

export default NoNaviLayout;