package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsNeighborDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.mapper.FeedsMapper;

@Service
public class FeedsServiceImpl implements FeedsService {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean writeFeed(FeedsDto feedsDto) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).writeFeed(feedsDto) == 1;

	}

	@Override
	public boolean deleteFeed(int feedIdx) throws Exception {
		sqlSession.getMapper(FeedsMapper.class).deleteFeedScrap(feedIdx);
		sqlSession.getMapper(FeedsMapper.class).deleteFeedComment(feedIdx);
		sqlSession.getMapper(FeedsMapper.class).deleteFeedLike(feedIdx);
		return sqlSession.getMapper(FeedsMapper.class).deleteMainFeed(feedIdx) == 1;
	}

	@Override
	public boolean modifyFeed(FeedsDto boardDto) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).modifyFeed(boardDto) == 1;
	}

	@Override
	public List<FeedsDto> recommendationFeed(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsDto> similarityTagFeed(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsDto> similarityColorFeed(FeedsDto boardDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FeedsNeighborDto> neighborFeed(int userIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).neighborFeed(userIdx);
	}

	@Override
	public FeedsParameterDto getFeed(int feedIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).getFeed(feedIdx);
	}

}
