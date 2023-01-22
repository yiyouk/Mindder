package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.mapper.FeedsMapper;

@Service
public class FeedsServiceImpl implements FeedsService {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean writeFeeds(FeedsDto feedsDto) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).writeFeeds(feedsDto) == 1;

	}

	@Override
	public boolean deleteFeeds(int feedIdx) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean modifyFeeds(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<FeedsDto> recommendationFeeds(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsDto> similarityTagFeeds(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsDto> similarityColorFeeds(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsDto> recommendationNeighbors(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FeedsDto getFeed(int feedIdx) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
