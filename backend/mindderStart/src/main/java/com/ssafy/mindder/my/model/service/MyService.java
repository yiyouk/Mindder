package com.ssafy.mindder.my.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;

public interface MyService {
	
	// 내가 쓴 피드 목록 조회
	public List<FeedListDto> findMyFeeds(int userIdx) throws Exception; 

}
