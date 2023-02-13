package com.ssafy.mindder.alarms.model.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;

@Mapper
public interface AlarmsMapper {
	
	// fcm 토큰 등록
	public void updateToken(TokenUpdateDto tokenUpdateDto) throws SQLException;

	// 알림을 보낸 / 받을 유저 정보 조회
	public AlarmsUserDto selectDeviceToken(int senderUserIdx, int receiverUserIdx) throws SQLException;

	// 팔로우 알림 등록
	public void insertFollowAlarm(int userIdx, int targetUserIdx) throws SQLException;

}
