package com.ssafy.mindder.comments.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.comments.model.CommentsDto;
import com.ssafy.mindder.comments.model.CommentsListDto;
import com.ssafy.mindder.comments.model.service.CommentsService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/comments")
@RestController
public class CommentsController {

	@Autowired
	private CommentsService commentsService;

	private static final Logger logger = LoggerFactory.getLogger(CommentsController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@ApiOperation(value = "피드 댓글 작성", notes = "댓글을 작성한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ApiResponse<?> writeCommnet(
			@RequestBody @ApiParam(value = "피드 정보.", required = true) CommentsDto commentsDto) throws Exception {
		logger.info("writeComment - 호출");

		try {
			commentsService.writeComment(commentsDto);
			return ApiResponse.success(SuccessCode.CREATE_COMMENT);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 댓글 등록 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "피드 댓글 삭제", notes = "댓글 번호에 해당하는 댓글을 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{commentIdx}")
	public ApiResponse<?> deleteComment(
			@PathVariable("commentIdx") @ApiParam(value = "삭제할 댓글 번호.", required = true) int commentIdx)
			throws Exception {
		logger.info("deleteComment - 호출");
		try {
			commentsService.deleteComment(commentIdx);
			return ApiResponse.success(SuccessCode.DELETE_COMMNET);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 댓글 삭제 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 댓글 리스트 조회에에에에에엥
	@ApiOperation(value = "피드 댓글 조회", notes = "피드에 달린 모든 댓글을 반환한다.", response = List.class)
	@GetMapping("/{feedIdx}")
	public ApiResponse<?> commentList(
			@PathVariable("feedIdx") @ApiParam(value = "해당 피드글 번호.", required = true) int feedIdx) throws Exception {
		logger.info("feedIdx - 호출");

		try {
			List<CommentsListDto> comment = commentsService.commentList(feedIdx);
			System.out.println(comment);
			return ApiResponse.success(SuccessCode.READ_COMMENT_LIST, comment);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 댓글 리스트 불러오는 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

}
