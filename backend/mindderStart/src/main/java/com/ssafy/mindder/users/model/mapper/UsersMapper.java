package com.ssafy.mindder.users.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.users.model.UsersDto;

@Mapper
public interface UsersMapper {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	UsersDto login(UsersDto usersdto)throws Exception;
	void addToken(UsersDto usersdto) throws Exception;
	UsersDto findSocialKakaoID(String userid) throws Exception;
	void updateUser(UsersDto usersdto)throws Exception;
	void deleteUser(int userIdx) throws Exception;
	void logout(int userIdx) throws Exception;
	String findpassword(int userIdx) throws Exception;
	int checkEmail(String email) throws Exception;
	void changePassword(UsersDto usersDto) throws Exception;
	String selectUserIdx(String email) throws Exception;
	void deletedJoinUser(UsersDto usersdto) throws Exception;
}
