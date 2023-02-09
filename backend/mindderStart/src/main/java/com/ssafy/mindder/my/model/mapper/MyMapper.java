package com.ssafy.mindder.my.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FeedsRecentDto;
import com.ssafy.mindder.my.model.FollowerDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.UserInformationDto;

@Mapper
public interface MyMapper {
	
	// 회원 정보 조회
	public UserInformationDto selectUser(int userIdx) throws SQLException;

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> selectMyFeeds(int userIdx) throws SQLException;
	
	// 타인이 쓴 피드 목록 조회
	public List<FeedListDto> selectOthersFeeds(int userIdx) throws SQLException;

	// 팔로워 목록 조회
	public List<FollowerDto> selectMyFollowers(int userIdx) throws SQLException;

	// 팔로잉 목록 조회
	public List<FollowsDto> selectMyFollowings(int userIdx) throws SQLException;

	// 월별 캘린더 조회
	public List<CalendarDto> selectMyCalendars(int year, int month, int userIdx) throws SQLException;
	
	// 팔로우 검색
	public String selectFollow(int userIdx, int targetUserIdx) throws SQLException;

	// 팔로우 등록
	public void insertMyFollow(int userIdx, int targetUserIdx) throws SQLException;

	// 팔로우 취소
	public void deleteMyFollow(int userIdx, int targetUserIdx) throws SQLException;

	// 최근에 쓴 피드의 감정, 색상 조회
	public FeedsRecentDto selectMyFeedsRecent(int userIdx) throws SQLException;

}
