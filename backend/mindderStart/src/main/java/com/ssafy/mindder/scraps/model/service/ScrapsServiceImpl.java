package com.ssafy.mindder.scraps.model.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.scraps.model.mapper.ScrapsMapper;

@Service
public class ScrapsServiceImpl implements ScrapsService {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void addScrap(int userIdx, int feedIdx) throws Exception {
		sqlSession.getMapper(ScrapsMapper.class).insertScrap(userIdx, feedIdx);
	}

}
