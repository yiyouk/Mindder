package com.ssafy.mindder.comments.model.service;

import java.util.List;

import com.ssafy.mindder.comments.model.CommentsDto;

public interface CommentsService {
	// 피드 댓글 삭제
	public boolean deleteComment(int commentIdx) throws Exception;

	// 피드 댓글 작성
	public boolean writeComment(CommentsDto commentsDto) throws Exception;

	// 피드 댓글 목록
	public List<CommentsDto> commentList(int feedIdx) throws Exception;

}
