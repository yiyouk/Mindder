package com.ssafy.mindder.comments.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.comments.model.CommentsDto;
import com.ssafy.mindder.comments.model.mapper.CommentsMapper;

@Service
public class CommentServiceImpl implements CommentsService {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean writeComment(CommentsDto commentsDto) throws Exception {
		return sqlSession.getMapper(CommentsMapper.class).writeComment(commentsDto) == 1;
	}

	@Override
	public boolean deleteComment(int commentIdx) throws Exception {
		return sqlSession.getMapper(CommentsMapper.class).deleteComment(commentIdx) == 1;
	}

	@Override
	public List<CommentsDto> commentList(int feedIdx) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
