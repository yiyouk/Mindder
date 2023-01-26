package com.ssafy.mindder.my.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.users.model.UsersDto;

@Mapper
public interface MyMapper {

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> selectMyFeeds(int userIdx) throws SQLException;

	// 스크랩 목록 조회
	public List<FeedsParameterDto> selectMyScraps(int userIdx) throws SQLException;

	// 팔로워 목록 조회
	public List<UsersDto> selectMyFollowers(int userIdx) throws SQLException;

	// 팔로잉 목록 조회
	public List<UsersDto> selectMyFollowings(int userIdx) throws SQLException;

}
