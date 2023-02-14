package com.ssafy.mindder.alarms.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.alarms.model.AlarmListDto;
import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;

@Mapper
public interface AlarmsMapper {
	
	// fcm 토큰 등록
	public void updateToken(TokenUpdateDto tokenUpdateDto) throws SQLException;

	// 알림을 보낸 / 받을 유저 정보 조회
	public AlarmsUserDto selectDeviceToken(int senderUserIdx, int receiverUserIdx) throws SQLException;

	// 팔로우 알림 등록
	public void insertFollowAlarm(int userIdx, int targetUserIdx, int fileIdx) throws SQLException;

	// 알림 목록 조회
	public List<AlarmListDto> selectAlarms(int userIdx) throws SQLException;

	// 알림에 등록할 유저 프로필 이미지 조회
	public int selectUserFileIdx(int userIdx) throws SQLException;

}
