import React from "react";
import { useSelector } from "react-redux";
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
        height: '3rem',
        width: '3rem',
    },

    // 댓글
    xs: {
        height:  '2em',
        width: '2rem',
    }
};

const ProfileImg = styled.div`
    ${sizeStyles}
    border: 1px solid #c0c0c0;
    border-radius: 100%;
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

function ProfileImage({size, userIdx, imgSrc}) {
    // console.log(imgSrc)
    const profileImg = useSelector((state)=>state.USER.profileImg)
    const navigate = useNavigate();
    const onClick = () => {
      navigate(`/${userIdx}`);
    };
    return (
        <ProfileImg onClick={onClick} size={size}>
            <img src={`data:image/png;base64,${imgSrc}`} alt="프로필이미지" />
        </ProfileImg>
    );
}

export default ProfileImage;
