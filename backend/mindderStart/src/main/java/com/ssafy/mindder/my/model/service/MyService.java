package com.ssafy.mindder.my.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FeedsRecentDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.UserInformationDto;

public interface MyService {
	
	// 회원 정보 조회
	public UserInformationDto findUser(int userIdx) throws Exception;

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception;
	
	// 타인이 쓴 피드 목록 조회
	public List<FeedListDto> findOthersFeeds(int userIdx) throws Exception;

	// 팔로워 목록 조회
	public List<FollowsDto> findMyFollowers(int userIdx) throws Exception;

	// 팔로잉 목록 조회
	public List<FollowsDto> findMyFollowings(int userIdx) throws Exception;

	// 월별 캘린더 조회 
	public List<CalendarDto> findMyCalendars(int year, int month, int userIdx) throws Exception;
	
	// 팔로우 검색
	public String findFollow(int userIdx, int targetUserIdx) throws Exception;

	// 팔로우 등록
	public void addMyFollow(int userIdx, int targetUserIdx) throws Exception;

	// 팔로우 취소
	public void removeMyFollow(int userIdx, int targetUserIdx) throws Exception;

	// 최근에 쓴 피드의 감정, 색상 조회
	public FeedsRecentDto findMyFeedsRecent(int userIdx) throws Exception;

	// 안 읽은 알림 수 조회
	public int findAlarmCount(int userIdx) throws Exception;

}
