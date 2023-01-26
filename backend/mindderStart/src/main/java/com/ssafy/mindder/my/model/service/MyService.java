package com.ssafy.mindder.my.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.users.model.UsersDto;

public interface MyService {

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception;

	// 스크랩 목록 조회
	public List<FeedsParameterDto> findMyScraps(int userIdx) throws Exception;

	// 팔로워 목록 조회
	public List<UsersDto> findMyFollowers(int userIdx) throws Exception;

	// 팔로잉 목록 조회
	public List<UsersDto> findMyFollowings(int userIdx) throws Exception;

}
