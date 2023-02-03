package com.ssafy.mindder.likes.model.service;

import com.ssafy.mindder.likes.model.LikesDto;

public interface LikesService {
	
	// 공감 검색
	public String findLike(LikesDto likesDto) throws Exception;

	// 공감 등록
	public void addLike(LikesDto likesDto) throws Exception;

	// 공감 수정
	public void modifyLike(LikesDto likesDto) throws Exception;
	
	// 공감 삭제
	public void removeLike(LikesDto likesDto) throws Exception;

}
