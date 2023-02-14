package com.ssafy.mindder.users.model.service;

import java.util.Map;

import com.ssafy.mindder.users.model.UsersDto;

public interface UsersService {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	UsersDto login(UsersDto usersdto)throws Exception;
	void addToken(UsersDto usersdto) throws Exception;
	Map<String, String> getUserInfo(String access_token) throws Exception;
	Map<String, String> getToken(String code) throws Exception;
	UsersDto findSocialKakaoID(String userid) throws Exception;
	void updateUser(UsersDto usersdto)throws Exception;
	void deleteUser(int userIdx) throws Exception;
	void logout(int userIdx) throws Exception;
	String findpassword(int userIdx) throws Exception;
	int checkEmail(String email) throws Exception;
	void changePassword(UsersDto usersDto) throws Exception;
	String findUserIdx(String email) throws Exception;
	void deletedJoinUser(UsersDto usersdto) throws Exception;
	int joinSocialKakaoID(UsersDto usersdto) throws Exception;
}
