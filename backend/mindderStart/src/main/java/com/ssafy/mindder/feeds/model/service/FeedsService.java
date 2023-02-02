package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsBearDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsNeighborDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;

public interface FeedsService {

	public boolean writeFeed(FeedsDto feedsDto) throws Exception;

	// 피드 삭제
	public boolean deleteFeed(int feedIdx) throws Exception;

	// 피드 수정
	public boolean modifyFeed(FeedsUpdateDto feedsDto) throws Exception;

	// 추천피드 목록 조회
	public List<FeedsDto> recommendationFeed(FeedsDto boardDto) throws Exception;

	// 유사감정 태그 피드 조회
	public List<FeedsDto> similarityTagFeed(FeedsDto boardDto) throws Exception;

	// 유사 감정 색상 태그 피드 조회
	public List<FeedsDto> similarityColorFeed(FeedsDto boardDto) throws Exception;

	// 사용자 이웃 피드 목록 조회
	List<FeedsNeighborDto> neighborFeed(int userIdx) throws Exception;

	// 피드 상세 조회
	public FeedsParameterDto getFeed(int feedIdx, int userIdx) throws Exception;

	// 완성된 곰돌이 조회
	FeedsBearDto searchFile(FeedsBearDto feedsBearDto);

	public List<FeedListDto> recommendation(int userIdx);

	//////////////////////////////////////////////////////////////////

}
