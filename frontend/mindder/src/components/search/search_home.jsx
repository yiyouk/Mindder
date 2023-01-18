import React from "react";
import { useNavigate} from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


function SearchPage(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>

        </Wrapper>
    );
}

export default SearchPage;
