package com.ssafy.mindder.my.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.feeds.model.FeedListDto;

@Mapper
public interface MyMapper {

	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> selectMyFeeds(int userIdx) throws SQLException;

}
