package com.ssafy.mindder.statistics.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.statistics.model.StatisticsDto;

@Mapper
public interface StatisticsMapper {
	
	// 통게 조회
	public List<StatisticsDto> selectStatistics() throws SQLException;

}
