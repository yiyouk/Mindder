package com.ssafy.mindder.scraps.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.scraps.model.ScrapListDto;
import com.ssafy.mindder.scraps.model.mapper.ScrapsMapper;

@Service
public class ScrapsServiceImpl implements ScrapsService {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void addScrap(int userIdx, int feedIdx) throws Exception {
		sqlSession.getMapper(ScrapsMapper.class).insertScrap(userIdx, feedIdx);
	}
	
	@Override
	public void removeScrap(int userIdx, int feedIdx) throws Exception {
		sqlSession.getMapper(ScrapsMapper.class).deleteScrap(userIdx, feedIdx);
	}
	
	@Override
	public List<ScrapListDto> findMyScraps(int userIdx) throws Exception {
		return sqlSession.getMapper(ScrapsMapper.class).selectMyScraps(userIdx);
	}

}
