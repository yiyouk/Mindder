package com.ssafy.mindder.my.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.service.MyService;
import com.ssafy.mindder.users.model.UsersDto;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/my")
public class MyController {

	@Autowired
	private MyService myService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "내가 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds/{userIdx}")
	public ApiResponse<?> myFeedList(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("myFeedList - 호출 : " + userIdx);
		try {
			List<FeedListDto> feedList = myService.findMyFeeds(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_FEED_LIST, feedList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFeedList - 내가 쓴 피드 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "스크랩 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedsParameterDto.class)
	@GetMapping("/scraps")
	public ApiResponse<?> myScrapList() {

		logger.debug("myScrapList - 호출 : ");
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;

			List<FeedsParameterDto> scrapList = myService.findMyScraps(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_SCRAP_LIST, scrapList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myScrapList - 스크랩 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "팔로워 목록 조회", notes = "유저 번호에 해당하는 유저의 팔로워 목록을 반환한다.", response = UsersDto.class)
	@GetMapping("/followers/{userIdx}")
	public ApiResponse<?> myFollowerList(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("myFollowerList - 호출 : " + userIdx);
		try {
			List<FollowsDto> followerList = myService.findMyFollowers(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_FOLLOWER_LIST, followerList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFollowerList - 팔로워 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "팔로잉 목록 조회", notes = "유저 번호에 해당하는 유저의 팔로잉 목록을 반환한다.", response = UsersDto.class)
	@GetMapping("/followings/{userIdx}")
	public ApiResponse<?> myFollowingList(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("myFollowingList - 호출 : " + userIdx);
		try {
			List<FollowsDto> followingList = myService.findMyFollowings(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_FOLLOWING_LIST, followingList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFollowingList - 팔로잉 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "월별 캘린더 조회", notes = "월에 해당하는 캘린더 정보를 반환한다.", response = CalendarDto.class)
	@GetMapping("/calendars/{month}")
	public ApiResponse<?> myCalendarList(
			@PathVariable("month") @ApiParam(value = "월", required = true) int month) {
		
		logger.debug("myCalendarList - 호출 : " + month);
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;
			
			List<CalendarDto> calendarList = myService.findMyCalendars(month, userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_CALENDAR_LIST, calendarList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myCalendarList - 월별 캘린더 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "팔로우 등록", notes = "유저 번호에 해당하는 유저를 팔로우한다.")
	@PostMapping("/follows/{userIdx}")
	public ApiResponse<?> followAdd(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int targetUserIdx) {
		
		logger.debug("followAdd - 호출 : " + targetUserIdx);
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;
			
			myService.addMyFollow(userIdx, targetUserIdx);
			return ApiResponse.success(SuccessCode.CREATE_MY_FOLLOW);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("followAdd - 팔로우 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "팔로우 취소", notes = "유저 번호에 해당하는 유저를 언팔로우한다.")
	@DeleteMapping("/follows/{userIdx}")
	public ApiResponse<?> followRemove(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int targetUserIdx) {
		
		logger.debug("followRemove - 호출 : " + targetUserIdx);
		try {
			// @fixme: 토큰 파싱해서 userIdx 가져오도록 수정 필요
			int userIdx = 7;
			
			myService.removeMyFollow(userIdx, targetUserIdx);
			return ApiResponse.success(SuccessCode.DELETE_MY_FOLLOW);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("followRemove - 팔로우 취소 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
