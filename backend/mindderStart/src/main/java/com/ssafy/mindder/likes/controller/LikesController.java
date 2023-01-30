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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	@PostMapping("/likes")
	public ApiResponse<?> LikeAdd(@RequestParam("access_token") String accessToken, @RequestBody LikesDto likesDto) {

		logger.debug("LikeAdd - 호출 : " + likesDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			likesDto.setUserIdx(userIdx);

			likesService.addLike(likesDto);
			return ApiResponse.success(SuccessCode.CREATE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("LikeAdd - 공감 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	
	@ApiOperation(value = "공감 수정", notes = "공감을 수정한다.")
	@PatchMapping("/likes")
	public ApiResponse<?> LikeModify(@RequestParam("access_token") String accessToken, @RequestBody LikesDto likesDto) {

		logger.debug("LikeModify - 호출 : " + likesDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			likesDto.setUserIdx(userIdx);
			
			likesService.modifyLike(likesDto);
			return ApiResponse.success(SuccessCode.UPDATE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("LikeModify - 공감 수정 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "공감 삭제", notes = "피드 번호에 해당하는 공감을 삭제한다.")
	@DeleteMapping("/likes/{feedIdx}")
	public ApiResponse<?> LikeRemove(@RequestParam("access_token") String accessToken,
			@PathVariable("feedIdx") @ApiParam(value = "피드 번호", required = true) int feedIdx) {

		logger.debug("LikeRemove - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			
			likesService.removeLike(userIdx, feedIdx);
			return ApiResponse.success(SuccessCode.DELETE_LIKE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("LikeRemove - 공감 삭제 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
