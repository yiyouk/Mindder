package com.ssafy.mindder.feeds.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.feeds.model.Criteria;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsBearDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.feeds.model.HashParserDto;

@Mapper
public interface FeedsMapper {
	// 피드 작성
	public int writeFeed(FeedsDto feedsDto) throws SQLException;

	public int writeCalendar(FeedsDto feedsDto) throws SQLException;

	// 피드 삭제
	public int deleteMainFeed(int feedIdx) throws SQLException;

	public int deleteFeedLike(int feedIdx) throws SQLException;

	public int deleteFeedComment(int feedIdx) throws SQLException;

	public int deleteFeedScrap(int feedIdx) throws SQLException;

	// 피드 수정
	public boolean modifyFeed(FeedsUpdateDto boardDto) throws SQLException;

	// 추천피드 목록 조회
	public List<FeedsDto> recommendationFeed(FeedsDto boardDto) throws SQLException;

	// 유사감정 태그 피드 조회
	public List<FeedsDto> similarityTagFeed(FeedsDto boardDto) throws SQLException;

	// 유사 감정 색상 태그 피드 조회
	public List<FeedsDto> similarityColorFeed(FeedsDto boardDto) throws SQLException;

	// 사용자 이웃 피드 목록 조회
	public List<FeedListDto> neighborFeed(int userIdx) throws SQLException;

	// 피드 상세 조회
	public FeedsParameterDto getFeed(int feedIdx, int userIdx) throws SQLException;

	// 피드 상세 조회 -> 스크랩 여부 확인
	public boolean myScrap(int feedIdx, int userIdx);

	// 피드 조회수 카운트
	public void updateHit(int feedIdx) throws SQLException;

	// 완성된 곰돌이 조회
	public FeedsBearDto searchFile(FeedsBearDto feedsBearDto);

	// 추천 피드 목록 조회
	public List<FeedListDto> recommendation1(int userIdx);

	public List<FeedListDto> recommendation2(int userIdx);

	// 주간 인기글 리스트 조회
	public List<FeedListDto> popularFeed(Criteria criteria);

	// 실시간 작성된 인기글 리스트 조회
	public List<FeedListDto> realtimeFeed(Criteria criteria);

	// 페이징 처리를 위한 피드 카운트
	public int getTotalCount(Criteria criteria);

	public int neighborFeedCount(Criteria criteria);

	public int popularFeedCounting(Criteria criteria);

	// 해시태그 -> 파싱해서 테이블에 저장
	public int hashTagParser(List<HashParserDto> hashParser);
	public List<FeedListDto> searchesFeed(String word)throws SQLException;
}