package com.ssafy.mindder.likes.model.service;

import com.ssafy.mindder.likes.model.LikesDto;

public interface LikesService {

	// 공감 등록
	public void addLike(LikesDto likesDto) throws Exception;

	// 공감 삭제
	public void removeLike(int userIdx, int feedIdx) throws Exception;

}
