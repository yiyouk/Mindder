package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.feeds.model.HashParserDto;

public interface FeedsService {

	public boolean writeFeed(FeedsDto feedsDto) throws Exception;

	// 피드 삭제
	public boolean deleteFeed(int feedIdx) throws Exception;

	public boolean hashTagDelete(int feedIdx) throws Exception;

	// 피드 수정
	public boolean modifyFeed(FeedsUpdateDto feedsDto) throws Exception;

	// 사용자 이웃 피드 목록 조회
	List<FeedListDto> neighborFeed(int pageNum, int userIdx) throws Exception;

	// 피드 상세 조회
	public FeedsParameterDto getFeed(int feedIdx, int userIdx) throws Exception;

	public boolean myScrap(int feedIdx, int userIdx) throws Exception;

	// 메인 추천 게시물 리스트 조회
	public List<FeedListDto> recommendation1(int userIdx) throws Exception;

	public List<FeedListDto> recommendation2(int userIdx) throws Exception;

	// 주간 인기글 리스트 조회
	public List<FeedListDto> popularFeed(int pageNum) throws Exception;

	// 실시간 작성된 게시글 리스트 조회
	public List<FeedListDto> realtimeFeed(int pageNum) throws Exception;

	// 해시태그 작성 후 #을 기준으로 파싱해서 해시 테이블에 저장
	public boolean hashTagParser(List<HashParserDto> hashParser) throws Exception;

	public List<FeedListDto> searchesFeed(String word) throws Exception;

	// emoteIdx, emoteColorIdx로 완성된 곰돌이 이모지 FileIdx 조회
	public int findFileIdx(int emoteIdx, int emoteColorIdx) throws Exception;

	public void addCalendar(int userIdx, int emoteCompleteFileIdx) throws Exception;

}
