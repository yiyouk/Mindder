package com.ssafy.mindder.searches.model.service;

import java.util.List;

import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.searches.model.SearchesDto;
import com.ssafy.mindder.users.model.UsersDto;

public interface SearchesService {
	SearchesDto find(String word) throws Exception;
	List<UsersDto> findUser(String word) throws Exception;
	List<String> findHash(String word) throws Exception;
}
