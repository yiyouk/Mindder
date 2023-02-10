package com.ssafy.mindder.searches.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.users.model.UsersDto;

@Mapper
public interface SearchesMapper {
	List<UsersDto> searchUser(String word) throws Exception;
	List<String> searchHash(String word) throws Exception;
	String selectKeyword(int userIdx) throws Exception;
}
