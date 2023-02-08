package com.ssafy.mindder.searches.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.searches.model.SearchesDto;
import com.ssafy.mindder.searches.model.mapper.SearchesMapper;

@Service
public class SearchesServiceImpl implements SearchesService {

	@Autowired
	SearchesMapper searchesMapper;
	@Override
	public SearchesDto find(String word) throws Exception {
		return searchesMapper.find(word);
	}

}
