// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const sizeStyles = css`
  /*크기*/
  ${({size}) => css`
    font-size: ${sizes[size].fontsize};
  `}
`;

// 폰트 사이즈
const sizes = {
    // 
    l: {
        fontsize: '1.5rem'
    },

    // 프로필
    m: {
        fontsize: '1rem'
    },

    // 팔로우 팔로잉
    s: {
        fontsize: '0.85rem'
    },

    // 댓글
    xs: {
        fontsize: '0.75rem'
    }
};

export const Nickname = styled.div`
    ${sizeStyles}
`

// size 입력 없을 경우 default 값은 m!
ProfileName.defaultProps = {
    size: "m",
  };


function ProfileName({userIdx, size, name}) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/${userIdx}`);
      };

    return (
        <Nickname size={size} onClick={onClick}>
            {name}
        </Nickname>
    );
}


export default ProfileName;
