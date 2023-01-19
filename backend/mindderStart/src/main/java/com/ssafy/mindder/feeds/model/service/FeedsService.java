package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedsDto;

public interface FeedsService {

	public boolean writeFeeds(FeedsDto feedsDto) throws Exception;

	// 피드 삭제
	public boolean deleteFeeds(int feedIdx) throws Exception;

	// 피드 수정
	public boolean modifyFeeds(FeedsDto boardDto) throws Exception;

	// 추천피드 목록 조회
	public List<FeedsDto> recommendationFeeds(FeedsDto boardDto) throws Exception;

	// 유사감정 태그 피드 조회
	public List<FeedsDto> similarityTagFeeds(FeedsDto boardDto) throws Exception;

	// 유사 감정 색상 태그 피드 조회
	public List<FeedsDto> similarityColorFeeds(FeedsDto boardDto) throws Exception;

	// 사용자 이웃 피드 목록 조회
	public List<FeedsDto> recommendationNeighbors(FeedsDto boardDto) throws Exception;

	// 피드 상세 조회
	public FeedsDto getFeed(int feedIdx) throws Exception;

	//////////////////////////////////////////////////////////////////

	// 피드 작성 예시 크롤링

	// 완성된 곰돌이 조회
	// idx 2개 받음 -> DB에서 조회해서 이미지 URL로 보내주면 됨

}