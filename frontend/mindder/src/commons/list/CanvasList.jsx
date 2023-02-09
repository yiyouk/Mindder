import React from "react";
import CanvasItem from "./CanvasItem";
import styled from "styled-components";


const Wrapper = styled.div`
    height: 7rem;
    width: 21rem;
    margin: 0.5rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

function CanvasList({list, size, up}) {
    return (
        <Wrapper>
            {list ? list.map((feed, index) => {
              return <CanvasItem list={feed} key={index} size={size} up={up}/>;
            }) : null}
        </Wrapper>
    );
}

export default CanvasList;