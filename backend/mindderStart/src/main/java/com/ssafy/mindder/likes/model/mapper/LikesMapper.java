package com.ssafy.mindder.likes.model.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.likes.model.LikesDto;

@Mapper
public interface LikesMapper {

	// 공감 등록
	public void insertLike(LikesDto likesDto) throws SQLException;
	
	// 공감 수정
	public void updateLike(LikesDto likesDto) throws SQLException;
 
	// 공감 삭제
	public void deleteLike(int userIdx, int feedIdx) throws SQLException;

}
