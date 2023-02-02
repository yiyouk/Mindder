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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.UserInformationDto;
import com.ssafy.mindder.my.model.service.MyService;
import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.util.JwtService;

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
	@Autowired
	private JwtService jwtService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);
	
	@ApiOperation(value = "회원 정보 조회 (마이페이지)", notes = "유저 번호에 해당하는 유저 정보를 반환한다.", response = UserInformationDto.class)
	@GetMapping("/information")
	ApiResponse<?> myUserDetails(@RequestHeader("access_token") String accessToken) {

		logger.debug("myUserDetails - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			UserInformationDto userDto = myService.findUser(userIdx);
			return ApiResponse.success(SuccessCode.READ_CHECK_USER, userDto);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myUserDetails - 회원 정보 조회 (마이페이지) 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "회원 정보 조회 (타인페이지)", notes = "유저 번호에 해당하는 유저 정보를 반환한다.", response = UserInformationDto.class)
	@GetMapping("/information/{userIdx}")
	ApiResponse<?> otherUserDetails(@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("otherUserDetails - 호출");
		try {
			UserInformationDto userDto = myService.findUser(userIdx);
			return ApiResponse.success(SuccessCode.READ_CHECK_USER, userDto);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("otherUserDetails - 회원 정보 조회 (타인페이지) 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "내가 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds")
	public ApiResponse<?> myFeedList(
			@RequestHeader("access_token") String accessToken) {

		logger.debug("myFeedList - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> feedList = myService.findMyFeeds(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_FEED_LIST, feedList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFeedList - 내가 쓴 피드 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "타인이 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds/{userIdx}")
	public ApiResponse<?> othersFeedList(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("othersFeedList - 호출 : " + userIdx);
		try {
			List<FeedListDto> feedList = myService.findOthersFeeds(userIdx);
			return ApiResponse.success(SuccessCode.READ_OTHERS_FEED_LIST, feedList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("othersFeedList - 타인이 쓴 피드 목록 조회 중 에러");
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
	public ApiResponse<?> myCalendarList(@RequestHeader("access_token") String accessToken,
			@PathVariable("month") @ApiParam(value = "월", required = true) int month) {
		
		logger.debug("myCalendarList - 호출 : " + month);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			
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
	public ApiResponse<?> followAdd(@RequestHeader("access_token") String accessToken,
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int targetUserIdx) {
		
		logger.debug("followAdd - 호출 : " + targetUserIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			if (myService.findFollow(userIdx, targetUserIdx) != null) {
				return ApiResponse.error(ErrorCode.VALIDATION_FOLLOW_EXCEPTION);
			}
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
	public ApiResponse<?> followRemove(@RequestHeader("access_token") String accessToken,
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int targetUserIdx) {
		
		logger.debug("followRemove - 호출 : " + targetUserIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			if (myService.findFollow(userIdx, targetUserIdx) == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_FOLLOW_EXCEPTION);
			}
			myService.removeMyFollow(userIdx, targetUserIdx);
			return ApiResponse.success(SuccessCode.DELETE_MY_FOLLOW);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("followRemove - 팔로우 취소 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
