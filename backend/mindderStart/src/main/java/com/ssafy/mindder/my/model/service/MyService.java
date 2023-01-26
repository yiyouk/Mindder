package com.ssafy.mindder.my.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;

public interface MyService {
	
	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception;

	// 스크랩 목록 조회
	public List<FeedsParameterDto> findMyScraps(int userIdx) throws Exception; 

}
