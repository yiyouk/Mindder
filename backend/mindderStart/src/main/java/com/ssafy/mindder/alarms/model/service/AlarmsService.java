package com.ssafy.mindder.alarms.model.service;

import java.util.List;

import com.ssafy.mindder.alarms.model.AlarmListDto;
import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;

public interface AlarmsService {
	
	// fcm 토큰 등록 
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception;

	// 알림을 보낸 / 받을 유저 정보 조회
	public AlarmsUserDto findDeviceToken(int senderUserIdx, int receiverUserIdx) throws Exception;

	// 팔로우 알림 등록
	public void addFollowAlarm(int userIdx, int targetUserIdx, int fileIdx) throws Exception;

	// 알림 목록 조회
	public List<AlarmListDto> findAlarms(int userIdx) throws Exception;

	// 알림에 등록할 유저 프로필 이미지 조회 
	public int findUserFileIdx(int userIdx) throws Exception;

}
