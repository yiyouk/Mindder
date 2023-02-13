package com.ssafy.mindder.alarms.model.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.alarms.model.TokenUpdateDto;
import com.ssafy.mindder.alarms.model.mapper.AlarmsMapper;

@Service
public class AlarmsServiceImpl implements AlarmsService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).updateToken(tokenUpdateDto);
	}
	
}
