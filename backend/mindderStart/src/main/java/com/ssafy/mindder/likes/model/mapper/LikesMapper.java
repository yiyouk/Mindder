package com.ssafy.mindder.likes.model.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.likes.model.LikesDto;

@Mapper
public interface LikesMapper {

	// 공감 등록
	public void insertLike(LikesDto likesDto) throws SQLException;

}
