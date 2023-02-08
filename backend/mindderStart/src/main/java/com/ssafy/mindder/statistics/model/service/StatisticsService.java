package com.ssafy.mindder.statistics.model.service;

import java.util.List;

import com.ssafy.mindder.statistics.model.StatisticsDto;

public interface StatisticsService {
	
	// 통계 조회
	public List<StatisticsDto> findStatistics() throws Exception;

}
