package com.ssafy.mindder.users.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.users.model.UsersDto;

@Mapper
public interface UsersMapper {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	UsersDto checkUser(int userIdx) throws Exception;
}
