package com.ssafy.mindder.statistics.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.my.model.FeedsRecentDto;

@Mapper
public interface StatisticsMapper {
	
	// 통게 조회
	public List<FeedsRecentDto> selectStatistics() throws SQLException;

}
