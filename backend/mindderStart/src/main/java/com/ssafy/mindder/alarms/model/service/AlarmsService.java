package com.ssafy.mindder.alarms.model.service;

import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;

public interface AlarmsService {
	
	// fcm 토큰 등록 
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception;

	// 알림을 보낸 / 받을 유저 정보 조회
	public AlarmsUserDto findDeviceToken(int senderUserIdx, int receiverUserIdx) throws Exception;

	// 팔로우 알림 등록
	public void addFollowAlarm(int userIdx, int targetUserIdx) throws Exception;

}
