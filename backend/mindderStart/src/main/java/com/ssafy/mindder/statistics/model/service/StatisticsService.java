package com.ssafy.mindder.statistics.model.service;

import java.util.List;

import com.ssafy.mindder.my.model.FeedsRecentDto;

public interface StatisticsService {
	
	// 통계 조회
	public List<FeedsRecentDto> findStatistics() throws Exception;

}
