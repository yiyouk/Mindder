package com.ssafy.mindder.my.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FollowsDto;

public interface MyService {

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception;

	// 스크랩 목록 조회
	public List<FeedsParameterDto> findMyScraps(int userIdx) throws Exception;

	// 팔로워 목록 조회
	public List<FollowsDto> findMyFollowers(int userIdx) throws Exception;

	// 팔로잉 목록 조회
	public List<FollowsDto> findMyFollowings(int userIdx) throws Exception;

	// 월별 캘린더 조회 
	public List<CalendarDto> findMyCalendars(int month, int userIdx) throws Exception;

	// 팔로우 등록
	public void addMyFollow(int userIdx, int targetUserIdx) throws Exception;

}
