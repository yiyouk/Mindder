// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled, { css } from "styled-components";


const Wrapper = styled.div`
    margin-right: 30px;
    display: flex;
    align-items: center;
    & > span {
        font-size: 1rem;
        color: #999999;
    }
`;

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
        fontsize: '0.7rem'
    }
};

export const Nickname = styled.div`
    ${sizeStyles}
    margin: 0.5rem 1rem 0.5rem 0;
`

// size 입력 없을 경우 default 값은 m!
ProfileName.defaultProps = {
    size: "m",
  };


function ProfileName({size, name}) {
    return (
        <Wrapper>
            <Nickname
                size={size}>
                {name}
            </Nickname>
        </Wrapper>
    );
}


export default ProfileName;
