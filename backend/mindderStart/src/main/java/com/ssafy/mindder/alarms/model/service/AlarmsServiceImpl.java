package com.ssafy.mindder.alarms.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.alarms.model.AlarmListDto;
import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.TokenUpdateDto;
import com.ssafy.mindder.alarms.model.mapper.AlarmsMapper;

@Service
public class AlarmsServiceImpl implements AlarmsService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void addToken(TokenUpdateDto tokenUpdateDto) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).updateToken(tokenUpdateDto);
	}
	
	@Override
	public AlarmsUserDto findPushInfo(int senderUserIdx, int receiverUserIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectPushInfo(senderUserIdx, receiverUserIdx);
	}
	
	@Override
	public void addFollowAlarm(int userIdx, int targetUserIdx) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).insertFollowAlarm(userIdx, targetUserIdx);
	}
	
	@Override
	public List<AlarmListDto> findAlarms(int userIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectAlarms(userIdx);
	}
	
	@Override
	public int findUserFileIdx(int userIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectUserFileIdx(userIdx);
	}
	
	@Override
	public void modifyAlarm(int alarmIdx) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).updateAlarm(alarmIdx);
	}
	
	@Override
	public String findAlarm(int alarmIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectAlarm(alarmIdx);
	}
	
	@Override
	public int findUserIdx(int feedIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectUserIdx(feedIdx);
	}
	
	@Override
	public void addCommentAlarm(int userIdx, int targetUserIdx, int feedIdx, int fileIdx) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).insertCommentAlarm(userIdx, targetUserIdx, feedIdx, fileIdx);
	}
	
	@Override
	public int findAlarmDuplication(int alarmType, int userIdx, int targetUserIdx) throws Exception {
		return sqlSession.getMapper(AlarmsMapper.class).selectAlarmDuplication(alarmType, userIdx, targetUserIdx);
	}
	
	@Override
	public void removeAlarm(int alarmIdx) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).deleteAlarm(alarmIdx);
	}
	
	@Override
	public void addLikeAlarm(int userIdx, int targetUserIdx, int feedIdx, int fileIdx, int likeType) throws Exception {
		sqlSession.getMapper(AlarmsMapper.class).insertLikeAlarm(userIdx, targetUserIdx, feedIdx, fileIdx, likeType);
	}
	
}
