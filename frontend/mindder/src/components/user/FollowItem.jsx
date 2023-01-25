import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import UserInfo from '../../commons/ui/ProfileImage';
import FollowButton from '../../commons/ui/FollowButton';


const Wrapper = styled.div`
    /* padding: 16px; */
    box-sizing: content-box;
    /* width: calc(100% - 40px); */
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


function FollowItem({props}) {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollowState = () => {
    console.log(isFollow)
    isFollow ? setIsFollow(false) : setIsFollow(true)
  };

  return (
    <Wrapper>
      {/* <Link to={`/${props.userID}}`}> */}
        <UserInfo name="양양" />
      {/* </Link> */}
      <FollowButton onClick={handleFollowState} active={isFollow} title={isFollow ? '팔로잉' : '팔로우'}/>
    </Wrapper>
  );
}

export default FollowItem;
