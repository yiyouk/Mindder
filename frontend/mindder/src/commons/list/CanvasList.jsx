import React from "react";
import CanvasItem from "./CanvasItem";
import styled from "styled-components";


const Wrapper = styled.div`
    height: 7rem;
    width: 21rem;
    margin: 0.3rem 0 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Padding = styled.div`
    margin-right: 0.1rem;
    margin-left: 0.1rem;
`

function CanvasList({list, size, up}) {
    return (
        <Wrapper>
            {list ? 
            list.map((feed, index) => {
              return (
                <Padding key={index}>
                    <CanvasItem list={feed} size={size} up={up}/>
                </Padding>
              )
            }) 
            : 
            null}
        </Wrapper>
    );
}

export default CanvasList;