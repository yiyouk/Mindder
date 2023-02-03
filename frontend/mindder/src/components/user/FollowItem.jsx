import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import FollowButton from '../../commons/ui/FollowButton';
import ProfileImage from '../../commons/ui/ProfileImage';
import ProfileName from '../../commons/ui/ProfileName';
import { ProfileContainer } from './UserMenu';

const Wrapper = styled.div`
    /* padding: 16px; */
    box-sizing: content-box;
    /* width: calc(100% - 40px); */
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


function FollowItem({data}) {
  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    console.log(data)
  }, [])
  const handleFollowState = () => {
    isFollow ? setIsFollow(false) : setIsFollow(true)
    console.log(isFollow)
  };

  return (
    <Wrapper>

        <ProfileContainer>
          <ProfileImage size="s"></ProfileImage>
          <ProfileName size="s" name={data.nickname}></ProfileName>
        </ProfileContainer>
        <FollowButton onClick={handleFollowState} active={isFollow}>
          {data.followIdx ? '팔로잉' : '팔로우'}
        </FollowButton>
    </Wrapper>
  );
}

export default FollowItem;
