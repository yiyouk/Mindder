package com.ssafy.mindder.searches.model.service;

import com.ssafy.mindder.searches.model.SearchesDto;

public interface SearchesService {
	SearchesDto find(String word) throws Exception;
}
