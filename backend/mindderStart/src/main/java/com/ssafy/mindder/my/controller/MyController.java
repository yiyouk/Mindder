package com.ssafy.mindder.my.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.service.MyService;
import com.ssafy.mindder.users.model.UsersDto;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/my")
public class MyController {

	@Autowired
	private MyService myService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);
	private static final String FAIL = "fail";

	@ApiOperation(value = "내가 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds/{userIdx}")
	public ResponseEntity<?> findMyFeeds(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("findMyFeeds - 호출 : " + userIdx);
		try {
			List<FeedListDto> feedList = myService.findMyFeeds(userIdx);
			return new ResponseEntity<List<FeedListDto>>(feedList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findMyFeeds - 내가 쓴 피드 목록 조회 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "스크랩 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedsParameterDto.class)
	@GetMapping("/scraps")
	public ResponseEntity<?> findMyScraps() {

		logger.debug("findMyScraps - 호출 : ");
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;

			List<FeedsParameterDto> scrapList = myService.findMyScraps(userIdx);
			return new ResponseEntity<List<FeedsParameterDto>>(scrapList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findMyFeeds - 스크랩 목록 조회 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "팔로워 목록 조회", notes = "유저 번호에 해당하는 팔로워의 목록을 반환한다.", response = UsersDto.class)
	@GetMapping("/followers/{userIdx}")
	public ResponseEntity<?> findMyFollowers(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("findMyFollowers - 호출 : " + userIdx);
		try {
			List<FollowsDto> followerList = myService.findMyFollowers(userIdx);
			return new ResponseEntity<List<FollowsDto>>(followerList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findMyFollowers - 팔로워 목록 조회 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@ApiOperation(value = "팔로잉 목록 조회", notes = "유저 번호에 해당하는 팔로잉의 목록을 반환한다.", response = UsersDto.class)
	@GetMapping("/followings/{userIdx}")
	public ResponseEntity<?> findMyFollowings(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("findMyFollowings - 호출 : " + userIdx);
		try {
			List<FollowsDto> followingList = myService.findMyFollowings(userIdx);
			return new ResponseEntity<List<FollowsDto>>(followingList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findMyFollowings - 팔로잉 목록 조회 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@ApiOperation(value = "월별 캘린더 조회", notes = "월에 해당하는 캘린더 정보를 반환한다.", response = CalendarDto.class)
	@GetMapping("/calendars/{month}")
	public ResponseEntity<?> findMyCalendars(
			@PathVariable("month") @ApiParam(value = "월", required = true) int month) {
		
		logger.debug("findMyCalendars - 호출 : " + month);
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;
			
			List<CalendarDto> calendarList = myService.findMyCalendars(month, userIdx);
			return new ResponseEntity<List<CalendarDto>>(calendarList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findMyCalendars - 월별 캘린더 조회 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
