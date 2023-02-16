package com.ssafy.mindder.alarms.model.service;

import java.util.List;

import com.ssafy.mindder.alarms.model.AlarmListDto;
import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;

public interface AlarmsService {
	
	// fcm 토큰 등록 
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception;

	// 알림을 보낸 / 받을 유저 정보 조회
	public AlarmsUserDto findPushInfo(int senderUserIdx, int receiverUserIdx) throws Exception;

	// 팔로우 알림 등록
	public void addFollowAlarm(int userIdx, int targetUserIdx) throws Exception;

	// 알림 목록 조회
	public List<AlarmListDto> findAlarms(int userIdx) throws Exception;

	// 알림에 등록할 유저 프로필 이미지 조회 
	public int findUserFileIdx(int userIdx) throws Exception;

	// 알림 읽음 처리
	public void modifyAlarm(int alarmIdx) throws Exception;

	// 알림 조회
	public String findAlarm(int alarmIdx) throws Exception;

	// 알림에 등록할 피드 작성자 idx 조회
	public int findUserIdx(int feedIdx) throws Exception;

	// 댓글 알림 등록
	public void addCommentAlarm(int userIdx, int targetUserIdx, int feedIdx) throws Exception;

	// 알림 등록 전 중복 확인 
	public int findAlarmDuplication(int alarmType, int userIdx, int targetUserIdx) throws Exception;

	// 알림 삭제
	public void removeAlarm(int alarmIdx) throws Exception;

	// 공감 알림 등록
	public void addLikeAlarm(int userIdx, int targetUserIdx, int feedIdx, int likeType) throws Exception;

	// 알림 전체 삭제
	public void removeAllAlarm(int userIdx) throws Exception;

	// 푸시 알림 수신 여부 조회
	public boolean findUserPushAlarmAgree(int userIdx) throws Exception;

}
