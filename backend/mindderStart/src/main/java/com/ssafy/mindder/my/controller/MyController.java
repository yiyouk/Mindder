package com.ssafy.mindder.my.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.service.AlarmsService;
import com.ssafy.mindder.alarms.model.service.FCMService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.my.model.CalendarDto;
import com.ssafy.mindder.my.model.FeedsRecentDto;
import com.ssafy.mindder.my.model.FollowsDto;
import com.ssafy.mindder.my.model.UserInformationDto;
import com.ssafy.mindder.my.model.service.MyService;
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
	@Autowired
	private FileService fileService;
	@Autowired
	private AlarmsService alarmsService;
	@Autowired
	private FCMService fcmService;

	@Value("${file.path.upload-files}")
	private String filePath;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "회원 정보 조회 (마이페이지)", notes = "유저 번호에 해당하는 유저 정보를 반환한다.", response = UserInformationDto.class)
	@GetMapping("/information")
	public ApiResponse<?> myUserDetails(@RequestHeader("access_token") String accessToken) {

		logger.debug("myUserDetails - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			UserInformationDto userDto = myService.findUser(userIdx);
			Map<String, String> file = fileService.findFile(userDto.getFileIdx(), filePath);
			userDto.setBase64(file.get("base64"));
			userDto.setExtension(file.get("extension"));
			int alarmCount = myService.findAlarmCount(userIdx);
			userDto.setAlarmCount(alarmCount);
			return ApiResponse.success(SuccessCode.READ_CHECK_USER, userDto);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myUserDetails - 회원 정보 조회 (마이페이지) 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "회원 정보 조회 (타인페이지)", notes = "유저 번호에 해당하는 유저 정보를 반환한다.", response = UserInformationDto.class)
	@GetMapping("/information/{userIdx}")
	public ApiResponse<?> otherUserDetails(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int targetUserIdx,
			@RequestHeader("access_token") String accessToken) {
		logger.debug("otherUserDetails - 호출");
		try {
			UserInformationDto userDto = myService.findUser(targetUserIdx);
			int userIdx = jwtService.getUserIdx(accessToken);
			if (targetUserIdx != userIdx) {
				if (myService.findFollow(userIdx, targetUserIdx) != null) {
					userDto.setFollowed(true);
				}
			}
			Map<String, String> file = fileService.findFile(userDto.getFileIdx(), filePath);
			userDto.setBase64(file.get("base64"));
			userDto.setExtension(file.get("extension"));

			return ApiResponse.success(SuccessCode.READ_CHECK_USER, userDto);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("otherUserDetails - 회원 정보 조회 (타인페이지) 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "내가 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds")
	public ApiResponse<?> myFeedList(@RequestHeader("access_token") String accessToken) {

		logger.debug("myFeedList - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> feedList = myService.findMyFeeds(userIdx);
			for (int i = 0; i < feedList.size(); i++) {
				Map<String, String> file = fileService.findFile(feedList.get(i).getFileIdx(), filePath);
				feedList.get(i).setBase64(file.get("base64"));
				feedList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_MY_FEED_LIST, feedList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFeedList - 내가 쓴 피드 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "타인이 쓴 피드 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedListDto.class)
	@GetMapping("/feeds/{userIdx}")
	public ApiResponse<?> othersFeedList(@RequestHeader("access_token") String accessToken,
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("othersFeedList - 호출 : " + userIdx);
		try {
			List<FeedListDto> feedList = myService.findOthersFeeds(userIdx);
			for (int i = 0; i < feedList.size(); i++) {
				Map<String, String> file = fileService.findFile(feedList.get(i).getFileIdx(), filePath);
				feedList.get(i).setBase64(file.get("base64"));
				feedList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_OTHERS_FEED_LIST, feedList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("othersFeedList - 타인이 쓴 피드 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "팔로워 목록 조회", notes = "유저 번호에 해당하는 유저의 팔로워 목록을 반환한다.", response = FollowsDto.class)
	@GetMapping("/followers/{userIdx}")
	public ApiResponse<?> myFollowerList(@RequestHeader("access_token") String accessToken,
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("myFollowerList - 호출 : " + userIdx);
		try {
			List<FollowsDto> followerList = myService.findMyFollowers(userIdx);
			userIdx = jwtService.getUserIdx(accessToken);
			for (int i = 0; i < followerList.size(); i++) {
				int followerUserIdx = followerList.get(i).getUserIdx();
				if (myService.findFollow(userIdx, followerUserIdx) != null) {
					followerList.get(i).setFollowed(true);
				}
				Map<String, String> file = fileService.findFile(followerList.get(i).getFileIdx(), filePath);
				followerList.get(i).setBase64(file.get("base64"));
				followerList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_MY_FOLLOWER_LIST, followerList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFollowerList - 팔로워 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "팔로잉 목록 조회", notes = "유저 번호에 해당하는 유저의 팔로잉 목록을 반환한다.", response = FollowsDto.class)
	@GetMapping("/followings/{userIdx}")
	public ApiResponse<?> myFollowingList(@RequestHeader("access_token") String accessToken,
			@PathVariable("userIdx") @ApiParam(value = "유저 번호", required = true) int userIdx) {

		logger.debug("myFollowingList - 호출 : " + userIdx);
		try {
			List<FollowsDto> followingList = myService.findMyFollowings(userIdx);
			userIdx = jwtService.getUserIdx(accessToken);
			for (int i = 0; i < followingList.size(); i++) {
				int followingUserIdx = followingList.get(i).getTargetUserIdx();
				if (myService.findFollow(userIdx, followingUserIdx) != null) {
					followingList.get(i).setFollowed(true);
				}
				Map<String, String> file = fileService.findFile(followingList.get(i).getFileIdx(), filePath);
				followingList.get(i).setBase64(file.get("base64"));
				followingList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_MY_FOLLOWING_LIST, followingList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFollowingList - 팔로잉 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "월별 캘린더 조회", notes = "월에 해당하는 캘린더 정보를 반환한다.", response = CalendarDto.class)
	@GetMapping("/calendars")
	public ApiResponse<?> myCalendarList(@RequestHeader("access_token") String accessToken,
			@RequestParam("year") int year, @RequestParam("month") int month) {

		logger.debug("myCalendarList - 호출 : ");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);

			List<CalendarDto> calendarList = myService.findMyCalendars(year, month, userIdx);
			for (int i = 0; i < calendarList.size(); i++) {
				Map<String, String> file = fileService.findFile(calendarList.get(i).getFileIdx(), filePath);
				calendarList.get(i).setBase64(file.get("base64"));
				calendarList.get(i).setExtension(file.get("extension"));
			}
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

			// 팔로우 등록
			myService.addMyFollow(userIdx, targetUserIdx);
	
			// 알림 등록
			alarmsService.addFollowAlarm(userIdx, targetUserIdx);
			
			// 알림 전송
			AlarmsUserDto alarmsUserDto = alarmsService.findPushInfo(userIdx, targetUserIdx);
			if (alarmsUserDto.getDeviceToken() != null) {
				fcmService.sendMessageTo(alarmsUserDto, 1);
			}

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

	@ApiOperation(value = "가장 최근에 쓴 피드의 감정, 색상 조회", notes = "피드의 감정과 색상을 반환한다.", response = FeedsRecentDto.class)
	@GetMapping("/feeds/recent")
	public ApiResponse<?> myFeedsRecentDetails(@RequestHeader("access_token") String accessToken){
		logger.info("myFeedsRecentDetails - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			FeedsRecentDto feedsRecentDto = myService.findMyFeedsRecent(userIdx);
			Map<String, String> file = fileService.findFile(feedsRecentDto.getFileIdx(), filePath);
			feedsRecentDto.setBase64(file.get("base64"));
			feedsRecentDto.setExtension(file.get("extension"));
			return ApiResponse.success(SuccessCode.READ_MY_FEEDS_RECENT, feedsRecentDto);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myFeedsRecentDetails - 가장 최근에 쓴 피드의 감정, 색상 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
