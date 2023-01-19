package com.ssafy.mindder.users.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.mapper.UsersMapper;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	UsersMapper usersMapper;
	@Override
	public UsersDto searchUser(String email)throws Exception {
		return usersMapper.searchUser(email);
	}
	@Override
	public void joinUser(UsersDto usersdto) throws Exception {
		usersMapper.joinUser(usersdto);
		
	}
	@Override
	public int checkNickname(String nickname) throws Exception {
		return usersMapper.checkNickname(nickname);
	}
}
