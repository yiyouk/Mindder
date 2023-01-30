package com.ssafy.mindder.likes.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@ApiOperation(value = "공감 등록", notes = "공감을 등록한다.")
	@PostMapping("/likes")
	public ResponseEntity<?> LikeAdd(@RequestParam("access_token") String accessToken, @RequestBody LikesDto likesDto) {

		logger.debug("LikeAdd - 호출 : " + likesDto);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			likesDto.setUserIdx(userIdx);

			likesService.addLike(likesDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("LikeAdd - 공감 등록 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "공감 삭제", notes = "피드 번호에 해당하는 공감을 삭제한다.")
	@DeleteMapping("/likes/{feedIdx}")
	public ResponseEntity<?> LikeRemove(@RequestParam("access_token") String accessToken,
			@PathVariable("feedIdx") @ApiParam(value = "피드 번호", required = true) int feedIdx) {

		logger.debug("LikeRemove - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			
			likesService.removeLike(userIdx, feedIdx);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("LikeRemove - 공감 삭제 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
