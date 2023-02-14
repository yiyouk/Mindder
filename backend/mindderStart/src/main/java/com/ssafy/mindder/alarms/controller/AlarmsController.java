package com.ssafy.mindder.alarms.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.alarms.model.AlarmListDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;
import com.ssafy.mindder.alarms.model.service.AlarmsService;
import com.ssafy.mindder.alarms.model.service.FCMService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmsController {

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

	@ApiOperation(value = "fcm 토큰 등록", notes = "fcm에서 발급받은 토큰을 유저 테이블에 등록한다.")
	@PostMapping()
	public ApiResponse<?> tokenAdd(@RequestHeader("access_token") String accessToken,
			@RequestBody() TokenUpdateDto tokenUpdateDto) {

		logger.debug("tokenAdd - 호출 : " + tokenUpdateDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			tokenUpdateDto.setUserIdx(userIdx);
			alarmsService.addToken(tokenUpdateDto);
			return ApiResponse.success(SuccessCode.UPDATE_USER_TOKEN);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("tokenAdd - fcm 토큰 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "알림 목록 조회", notes = "로그인한 유저의 알림 목록을 반환한다.", response = AlarmListDto.class)
	@GetMapping()
	public ApiResponse<?> alarmList(@RequestHeader("access_token") String accessToken) {

		logger.debug("alarmList - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<AlarmListDto> alarmList = alarmsService.findAlarms(userIdx);
			for (int i = 0; i < alarmList.size(); i++) {
				Map<String, String> file = fileService.findFile(alarmList.get(i).getFileIdx(), filePath);
				alarmList.get(i).setBase64(file.get("base64"));
				alarmList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_ALARM_LIST, alarmList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("alarmList - 알림 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "알림 읽음 처리", notes = "alarmIdx에 해당하는 알림을 읽음 처리한다.", response = String.class)
	@PatchMapping("/{alarmIdx}")
	public ApiResponse<?> alarmModify(@RequestHeader("access_token") String accessToken,
			@PathVariable("alarmIdx") @ApiParam(value = "알림 번호", required = true) int alarmIdx) {
		logger.debug("alarmModify - 호출");
		try {
			if (alarmsService.findAlarm(alarmIdx) == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_ALARM_EXCEPTION);
			}
			alarmsService.modifyAlarm(alarmIdx);
			return ApiResponse.success(SuccessCode.UPDATE_ALARM);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("alarmModify - 알림 읽음 처리 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

}
