package com.ssafy.mindder.my.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FollowsDto;

@Mapper
public interface MyMapper {

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> selectMyFeeds(int userIdx) throws SQLException;

	// 스크랩 목록 조회
	public List<FeedsParameterDto> selectMyScraps(int userIdx) throws SQLException;

	// 팔로워 목록 조회
	public List<FollowsDto> selectMyFollowers(int userIdx) throws SQLException;

	// 팔로잉 목록 조회
	public List<FollowsDto> selectMyFollowings(int userIdx) throws SQLException;

	// 월별 캘린더 조회
	public List<CalendarDto> selectMyCalendars(int month, int userIdx) throws SQLException;

}
