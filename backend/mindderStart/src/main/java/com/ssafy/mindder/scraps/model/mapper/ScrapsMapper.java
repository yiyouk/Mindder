package com.ssafy.mindder.scraps.model.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScrapsMapper {

	// 스크랩 등록
	public void insertScrap(int userIdx, int feedIdx) throws SQLException;

}
