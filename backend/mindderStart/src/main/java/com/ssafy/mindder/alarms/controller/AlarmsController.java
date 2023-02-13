package com.ssafy.mindder.alarms.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.alarms.model.AlarmsDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;
import com.ssafy.mindder.alarms.model.service.AlarmsService;
import com.ssafy.mindder.alarms.model.service.FCMService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmsController {
	
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AlarmsService alarmsService;
	@Autowired
	private FCMService firebaseCloudMessageService;
	
	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

//	@PostMapping()
//	public ApiResponse<?> pushMessage(@RequestBody AlarmsDto alarmsDto) throws IOException {
//
//		try {
//			firebaseCloudMessageService.sendMessageTo(alarmsDto.getTargetToken(), alarmsDto.getTitle(),
//					alarmsDto.getBody());
//			return ApiResponse.success(SuccessCode.CREATE_PUSH_ALARMS);
//		} catch (Exception e) {
//			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
//		}
//	}
	
	@ApiOperation(value = "fcm 토큰 등록", notes = "fcm에서 발급받은 토큰을 유저 테이블에 등록한다.")
	@PostMapping("/join")
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

}
