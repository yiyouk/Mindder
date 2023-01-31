package com.ssafy.mindder.comments.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.mindder.comments.model.CommentsDto;
import com.ssafy.mindder.comments.model.CommentsListDto;

@Service
public interface CommentsService {
	// 피드 댓글 삭제
	public boolean deleteComment(int commentIdx) throws Exception;

	// 피드 댓글 작성
	public boolean writeComment(CommentsDto commentsDto) throws Exception;

	// 피드 댓글 목록
	public List<CommentsListDto> commentList(int feedIdx) throws Exception;

}
