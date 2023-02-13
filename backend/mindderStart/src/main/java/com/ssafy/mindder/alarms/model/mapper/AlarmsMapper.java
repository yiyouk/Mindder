package com.ssafy.mindder.alarms.model.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.alarms.model.TokenUpdateDto;

@Mapper
public interface AlarmsMapper {
	
	// fcm 토큰 등록
	public void updateToken(TokenUpdateDto tokenUpdateDto) throws SQLException;

}
