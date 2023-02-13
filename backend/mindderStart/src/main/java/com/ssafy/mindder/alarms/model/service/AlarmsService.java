package com.ssafy.mindder.alarms.model.service;

import com.ssafy.mindder.alarms.model.TokenUpdateDto;

public interface AlarmsService {
	
	// fcm 토큰 등록 
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception;

}
