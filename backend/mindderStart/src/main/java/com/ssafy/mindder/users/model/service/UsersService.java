package com.ssafy.mindder.users.model.service;

import org.springframework.stereotype.Service;

import com.ssafy.mindder.users.model.UsersDto;

public interface UsersService {
	UsersDto searchUser(String email)throws Exception;
	void joinUser(UsersDto usersdto) throws Exception;
	int checkNickname(String nickname) throws Exception;
	
}
