import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import { useSelector} from "react-redux";

const Bodysuit = styled.div`
    background-color:  #7767FD;
    width: 100vw;
    height: 100vh;
`;

const Bodysuit2 = styled.div`
    width: 100vw;
    height: 100vh;
`;

const MainLayout =()=>{
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated)

    return(
        <>
            {isLoggedIn ? 
            <Bodysuit2>
                <Outlet/>
            </Bodysuit2>
            :
            <Bodysuit>
                <Outlet/>
            </Bodysuit> 
            }
        </>
    )

}

export default MainLayout;