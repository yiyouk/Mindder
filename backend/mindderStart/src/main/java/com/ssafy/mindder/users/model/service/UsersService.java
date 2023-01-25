package com.ssafy.mindder.users.model.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssafy.mindder.users.model.UsersDto;

public interface UsersService {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	UsersDto checkUser(int userIdx) throws Exception;
	UsersDto login(UsersDto usersdto)throws Exception;
	void addToken(UsersDto usersdto) throws Exception;
	Map<String, String> getUserInfo(String access_token) throws Exception;
	Map<String, String> getToken(String code) throws Exception;
	UsersDto findSocialKakaoID(String userid) throws Exception;
	void updateUser(UsersDto usersdto)throws Exception;
	void deleteUser(int userIdx) throws Exception;
	void logout(int userIdx) throws Exception;
	String findpassword(int userIdx) throws Exception;
}
