import {React, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import LikeIcon from "../../assets/images/like.png"

const Wrapper = styled.div`
    width: 6rem;
`;


function EmoManage({likeTotalCount}) {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(0);

  return (
    <div>  
        <img src={LikeIcon} style={{position:'relative', top:'6px'}} width={20} alt="감정표현수"/> <span style={{fontSize:'12px'}}>받은 마음 {likeTotalCount}개</span>   
    </div>

  );
};

export default EmoManage;