package com.ssafy.mindder.scraps.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.scraps.model.ScrapListDto;

@Mapper
public interface ScrapsMapper {

	// 스크랩 검색 
	public String selectScrap(int userIdx, int feedIdx) throws SQLException;
	
	// 스크랩 등록
	public void insertScrap(int userIdx, int feedIdx) throws SQLException;

	// 스크랩 삭제
	public void deleteScrap(int userIdx, int feedIdx) throws SQLException;

	// 스크랩 목록 조회
	public List<ScrapListDto> selectMyScraps(int userIdx) throws SQLException;

}
