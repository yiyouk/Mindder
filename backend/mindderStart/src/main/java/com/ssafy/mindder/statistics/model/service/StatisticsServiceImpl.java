package com.ssafy.mindder.statistics.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.statistics.model.StatisticsDto;
import com.ssafy.mindder.statistics.model.mapper.StatisticsMapper;

@Service
public class StatisticsServiceImpl implements StatisticsService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<StatisticsDto> findStatistics() throws Exception {
		return sqlSession.getMapper(StatisticsMapper.class).selectStatistics();
	}
	
}
