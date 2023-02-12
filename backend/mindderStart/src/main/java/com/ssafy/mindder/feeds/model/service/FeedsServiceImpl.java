package com.ssafy.mindder.feeds.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.feeds.model.Criteria;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsBearDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.feeds.model.HashParserDto;
import com.ssafy.mindder.feeds.model.mapper.FeedsMapper;

@Service
public class FeedsServiceImpl implements FeedsService {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean writeFeed(FeedsDto feedsDto) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).writeFeed(feedsDto) == 1;
	}
	
	@Override
	public int findFileIdx(int emoteIdx, int emoteColorIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).selectFileIdx(emoteIdx, emoteColorIdx);
	}
	
	@Override
	public void addCalendar(int userIdx, int emoteCompleteFileIdx) throws Exception {
		sqlSession.getMapper(FeedsMapper.class).insertCalendar(userIdx, emoteCompleteFileIdx);
	}

	@Override
	public boolean deleteFeed(int feedIdx) throws Exception {
		sqlSession.getMapper(FeedsMapper.class).deleteFeedScrap(feedIdx);
		sqlSession.getMapper(FeedsMapper.class).deleteFeedComment(feedIdx);
		sqlSession.getMapper(FeedsMapper.class).deleteFeedLike(feedIdx);
		sqlSession.getMapper(FeedsMapper.class).hashTagDelete(feedIdx);
		return sqlSession.getMapper(FeedsMapper.class).deleteMainFeed(feedIdx) == 1;
	}

	@Override
	public boolean modifyFeed(FeedsUpdateDto boardDto) throws Exception {
		// 피드글 수정 시 -> 해시태그 테이블에서 관련 idx 태그들을 모두 삭제 후

		// 다시 파싱해서 insert해줘야함
		return sqlSession.getMapper(FeedsMapper.class).modifyFeed(boardDto);
	}

	@Override
	public List<FeedListDto> neighborFeed(int userIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).neighborFeed(userIdx);
	}

	@Override
	public FeedsParameterDto getFeed(int feedIdx, int userIdx) throws Exception {
		// 조회수 증가
		sqlSession.getMapper(FeedsMapper.class).updateHit(feedIdx);
		// 스크랩 여부 확인
		return sqlSession.getMapper(FeedsMapper.class).getFeed(feedIdx, userIdx);
	}

	@Override
	public FeedsBearDto searchFile(FeedsBearDto feedsBearDto) {
		return sqlSession.getMapper(FeedsMapper.class).searchFile(feedsBearDto);

	}

	@Override
	public List<FeedListDto> recommendation1(int userIdx) {
		return sqlSession.getMapper(FeedsMapper.class).recommendation1(userIdx);
	}

	@Override
	public List<FeedListDto> recommendation2(int userIdx) {
		return sqlSession.getMapper(FeedsMapper.class).recommendation2(userIdx);
	}

	@Override
	public boolean myScrap(int feedIdx, int userIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).myScrap(feedIdx, userIdx);
	}

	@Override
	public List<FeedListDto> realtimeFeed(Criteria criteria) {
		return sqlSession.getMapper(FeedsMapper.class).realtimeFeed(criteria);
	}

	@Override
	public List<FeedListDto> popularFeed(Criteria criteria) {
		return sqlSession.getMapper(FeedsMapper.class).popularFeed(criteria);
	}

	@Override
	public int getTotalCount(Criteria criteria) {
		return sqlSession.getMapper(FeedsMapper.class).getTotalCount(criteria);
	}

	@Override
	public int neighborFeedCount(Criteria criteria) {
		return sqlSession.getMapper(FeedsMapper.class).neighborFeedCount(criteria);
	}

	@Override
	public int popularFeedCounting(Criteria criteria) {
		return sqlSession.getMapper(FeedsMapper.class).popularFeedCounting(criteria);
	}

	@Override
	public boolean hashTagParser(List<HashParserDto> hashParser) {
		// 메인피드의 해시태그를 파싱해서 해시 테이블에 저장
		return sqlSession.getMapper(FeedsMapper.class).hashTagParser(hashParser) == 1;

	}

	@Override
	public boolean hashTagDelete(int feedIdx) throws Exception {
		return sqlSession.getMapper(FeedsMapper.class).hashTagDelete(feedIdx) == 1;
	}

	@Override
	public List<FeedListDto> searchesFeed(String word) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.getMapper(FeedsMapper.class).searchesFeed(word);
	}

}
