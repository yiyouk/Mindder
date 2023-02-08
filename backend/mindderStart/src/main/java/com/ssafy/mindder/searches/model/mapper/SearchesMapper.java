package com.ssafy.mindder.searches.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.mindder.searches.model.SearchesDto;

@Mapper
public interface SearchesMapper {
	SearchesDto find(String word) throws Exception;
}
