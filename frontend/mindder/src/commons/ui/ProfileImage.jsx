import React from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";

// 임시 user Img
import UserImg from "../../assets/images/CanvasSample.png"

const sizeStyles = css`
  /*크기*/
  ${({size}) => css`
    height: ${sizes[size].height};
    width: ${sizes[size].width};
    font-size: ${sizes[size].fontsize};
  `}
`;

// 사이즈
const sizes = {
    // 회원정보 수정
    l: {
        height: '10rem',
        width: '10rem',
    },

    // 유저페이지
    m: {
        height: '4.5rem',
        width: '4.5rem',
    },

    // 팔로우 팔로잉 리스트
    s: {
        height: '3.2rem',
        width: '3.2rem',
    },

    // 댓글
    xs: {
        height:  '2.8em',
        width: '2.8rem',
    }
};

const Wrapper = styled.div`
    margin-right: 1rem;
    display: flex;
    align-items: center;
    & > span {
        font-size: 1rem;
        color: #999999;
    }
`;

const ProfileImg = styled.div`
    ${sizeStyles}
    margin: 0.5rem 1rem 0.5rem 0;
    border: 1px solid #c0c0c0;
    border-radius: 50%;
    overflow: hidden;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`;
// size 입력 없을 경우 default 값은 m!
ProfileImage.defaultProps = {
    size: "m",
  };

function ProfileImage({size, userId}) {
    const navigate = useNavigate();
    const onClick = () => {
      navigate(`/${userId}`);
    };
    return (
        <Wrapper>
            <ProfileImg onClick={onClick} size={size}>
                    <img src={UserImg} alt="프로필이미지" />
            </ProfileImg>
        </Wrapper>
    );
}

export default ProfileImage;
