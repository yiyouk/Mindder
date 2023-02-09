package com.ssafy.mindder.alarms.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.alarms.model.AlarmsDto;
import com.ssafy.mindder.alarms.model.service.FCMService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmsController {

	private final FCMService firebaseCloudMessageService;

	@PostMapping()
	public ApiResponse<?> pushMessage(@RequestBody AlarmsDto alarmsDto) throws IOException {

		try {
			firebaseCloudMessageService.sendMessageTo(alarmsDto.getTargetToken(), alarmsDto.getTitle(),
					alarmsDto.getBody());
			return ApiResponse.success(SuccessCode.CREATE_PUSH_ALARMS);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
