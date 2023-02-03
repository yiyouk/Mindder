import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Bodysuit = styled.div`
    //위 옆 아래..
    padding: 0.5rem 1rem 3rem 1rem;
`;

const MainLayout =()=>{
    return(
        <Bodysuit>
            <HeaderBar/>
            <Outlet/>
            <NaviBar/>
        </Bodysuit>
    )

}

export default MainLayout;