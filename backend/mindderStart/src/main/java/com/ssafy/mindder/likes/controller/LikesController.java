package com.ssafy.mindder.likes.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.likes.model.LikesDto;
import com.ssafy.mindder.likes.model.service.LikesService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/likes")
public class LikesController {

	@Autowired
	private LikesService likesService;
	@Autowired
	private JwtService jwtService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "공감 등록", notes = "공감을 등록한다.")
	@PostMapping()
	public ApiResponse<?> likeAdd(@RequestHeader("access_token") String accessToken, @RequestBody LikesDto likesDto) {

		logger.debug("likeAdd - 호출 : " + likesDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			likesDto.setUserIdx(userIdx);
			if (likesService.findLike(likesDto) != null) {
				return ApiResponse.error(ErrorCode.VALIDATION_LIKE_EXCEPTION);
			}
			int likeType = likesDto.getLikeType();
			if (likeType != 1 && likeType != 2 && likeType != 3 ) {
				return ApiResponse.error(ErrorCode.VALIDATION_LIKE_TYPE_EXCEPTION);
			}
			likesService.addLike(likesDto);
			return ApiResponse.success(SuccessCode.CREATE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("likeAdd - 공감 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "공감 수정", notes = "공감을 수정한다.")
	@PatchMapping()
	public ApiResponse<?> likeModify(@RequestHeader("access_token") String accessToken, @RequestBody LikesDto likesDto) {

		logger.debug("likeModify - 호출 : " + likesDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			likesDto.setUserIdx(userIdx);
			if (likesService.findLike(likesDto) == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_LIKE_EXCEPTION);
			}
			int likeType = likesDto.getLikeType();
			if (likeType != 1 && likeType != 2 && likeType != 3 ) {
				return ApiResponse.error(ErrorCode.VALIDATION_LIKE_TYPE_EXCEPTION);
			}
			likesService.modifyLike(likesDto);
			return ApiResponse.success(SuccessCode.UPDATE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("likeModify - 공감 수정 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "공감 삭제", notes = "피드 번호에 해당하는 공감을 삭제한다.")
	@DeleteMapping("/{feedIdx}")
	public ApiResponse<?> likeRemove(@RequestHeader("access_token") String accessToken,
			@PathVariable("feedIdx") @ApiParam(value = "피드 번호", required = true) int feedIdx) {

		logger.debug("likeRemove - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			LikesDto likesDto = new LikesDto(userIdx, feedIdx, 0);
			if (likesService.findLike(likesDto) == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_LIKE_EXCEPTION);
			}
			likesService.removeLike(likesDto);
			return ApiResponse.success(SuccessCode.DELETE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("likeRemove - 공감 삭제 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
