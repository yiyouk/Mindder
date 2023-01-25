package com.ssafy.mindder.my.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.my.model.mapper.MyMapper;

@Service
public class MyServiceImpl implements MyService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception {
		return sqlSession.getMapper(MyMapper.class).selectMyFeeds(userIdx);
	}
}
