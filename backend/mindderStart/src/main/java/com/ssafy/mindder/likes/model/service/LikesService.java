package com.ssafy.mindder.likes.model.service;

import com.ssafy.mindder.likes.model.LikesDto;

public interface LikesService {

	// 공감 등록
	void addLike(LikesDto likesDto) throws Exception;

}
