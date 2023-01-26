package com.ssafy.mindder.comments.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.mindder.comments.model.CommentsDto;

public interface CommentsMapper {
	// 피드 댓글 작성
	public int writeComment(CommentsDto commentsDto) throws SQLException;

	// 피드 댓글 삭제
	public int deleteComment(int commentIdx) throws SQLException;

	// 피드 댓글 목록 조회 (리스트 형식 )
	public List<CommentsDto> commentList(int feedIdx) throws SQLException;

}
