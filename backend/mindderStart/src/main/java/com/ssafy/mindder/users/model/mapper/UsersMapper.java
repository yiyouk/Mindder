package com.ssafy.mindder.users.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.users.model.UsersDto;

@Mapper
public interface UsersMapper {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	UsersDto checkUser(int userIdx) throws Exception;
	UsersDto login(UsersDto usersdto)throws Exception;
	void addToken(UsersDto usersdto) throws Exception;
	UsersDto findSocialID(String userid) throws Exception;
	void updateUser(UsersDto usersdto)throws Exception;
	void deleteUser(int userIdx) throws Exception;
}
