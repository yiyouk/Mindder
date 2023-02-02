package com.ssafy.mindder.scraps.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;

public interface ScrapsService {

	// 스크랩 등록
	public void addScrap(int userIdx, int feedIdx) throws Exception;

	// 스크랩 삭제
	public void removeScrap(int userIdx, int feedIdx) throws Exception;
	
	// 스크랩 목록 조회
	public List<FeedListDto> findMyScraps(int userIdx) throws Exception;
 
}
