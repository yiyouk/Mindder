package com.ssafy.mindder.searches.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.searches.model.SearchesDto;
import com.ssafy.mindder.searches.model.mapper.SearchesMapper;
import com.ssafy.mindder.users.model.UsersDto;

@Service
public class SearchesServiceImpl implements SearchesService {

	@Autowired
	SearchesMapper searchesMapper;

	@Override
	public SearchesDto find(String word) throws Exception {

		return null;
	}

	@Override
	public List<UsersDto> findUser(String word) throws Exception {
		return searchesMapper.searchUser(word);
	}

	@Override
	public List<String> findHash(String word) throws Exception {
		return searchesMapper.searchHash(word);
	}
	
	@Override
	public String findKeyword(int userIdx) throws Exception {
		return searchesMapper.selectKeyword(userIdx);
	}

}
