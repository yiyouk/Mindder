package com.ssafy.mindder.likes.model.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.likes.model.LikesDto;
import com.ssafy.mindder.likes.model.mapper.LikesMapper;

@Service
public class LikesServiceImpl implements LikesService {
	
	@Autowired
	private SqlSession sqlSession;
	
	// 공감 등록
	@Override
	public void addLike(LikesDto likesDto) throws Exception {
		sqlSession.getMapper(LikesMapper.class).insertLike(likesDto);
	}

}
