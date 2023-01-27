package com.ssafy.mindder.feeds.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsNeighborDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.service.FeedsService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/feeds")
@RestController
public class FeedsController {

	@Autowired
	private FeedsService feedsService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@ApiOperation(value = "피드글 작성", notes = "새로운 피드의 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<String> writeFeeds(
			@RequestBody @ApiParam(value = "피드 정보.", required = true) FeedsDto feedsDto) throws Exception {
		logger.info("writeArticle - 호출");
		if (feedsService.writeFeed(feedsDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "피드글 수정", notes = "수정할 피드의 정보를 입력한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping
	public ResponseEntity<String> modifyFeed(
			@RequestBody @ApiParam(value = "수정할 글정보.", required = true) FeedsDto feedsDto) throws Exception {
		logger.info("modifyFeed - 호출 {}", feedsDto);

		if (feedsService.modifyFeed(feedsDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}

	@ApiOperation(value = "피드글 삭제", notes = "글번호에 해당하는 게시글의 정보를 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{feedIdx}")
	public ResponseEntity<String> deleteFeed(
			@PathVariable("feedIdx") @ApiParam(value = "살제할 글의 글번호.", required = true) int feedIdx) throws Exception {
		logger.info("deleteFeed - 호출");
		if (feedsService.deleteFeed(feedIdx)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "피드글 상세 보기", notes = "글번호에 해당하는 게시글의 정보를 반환한다.", response = FeedsParameterDto.class)
	@GetMapping("/{feedIdx}")
	public ResponseEntity<FeedsParameterDto> getFeed(
			@PathVariable("feedIdx") @ApiParam(value = "얻어올 글의 글번호.", required = true) int feedIdx) throws Exception {
		logger.info("getFeed - 호출 : " + feedIdx);
		return new ResponseEntity<FeedsParameterDto>(feedsService.getFeed(feedIdx), HttpStatus.OK);

	}

	// 댓글 리스트 조회에에에에에엥
	@ApiOperation(value = "팔로잉하는 이웃의 피드 조회", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("neighbors/{userIdx}")
	public ResponseEntity<List<FeedsNeighborDto>> neighborFeed(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호 ", required = true) int userIdx) throws Exception {
		logger.info("userIdx - 호출");
		return new ResponseEntity<List<FeedsNeighborDto>>(feedsService.neighborFeed(userIdx), HttpStatus.OK);
	}

}
