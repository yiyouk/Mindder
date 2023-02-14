package com.ssafy.mindder.comments.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.service.AlarmsService;
import com.ssafy.mindder.alarms.model.service.FCMService;
import com.ssafy.mindder.comments.model.CommentsDto;
import com.ssafy.mindder.comments.model.CommentsListDto;
import com.ssafy.mindder.comments.model.service.CommentsService;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/comments")
@RestController
public class CommentsController {

	@Autowired
	private CommentsService commentsService;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private FileService fileService;
	@Autowired
	private AlarmsService alarmsService;
	@Autowired
	private FCMService fcmService;

	@Value("${file.path.upload-files}")
	private String filePath;

	private static final Logger logger = LoggerFactory.getLogger(CommentsController.class);

	@ApiOperation(value = "피드 댓글 작성", notes = "댓글을 작성한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ApiResponse<?> writeCommnet(@RequestBody CommentsDto commentsDto,
			@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("writeComment - 호출");

		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			commentsDto.setUserIdx(userIdx);
			commentsService.writeComment(commentsDto);

			// 알림에 등록할 유저 프로필 이미지 조회
			int fileIdx = alarmsService.findUserFileIdx(userIdx);
			// 알림에 등록할 피드 작성자 아이디 조희
			int targetUserIdx = alarmsService.findUserIdx(commentsDto.getFeedIdx());

			int alarmIdx = alarmsService.findAlarmDuplication(2, userIdx, targetUserIdx);
			// 알림 등록
			if (alarmIdx == 0) {
				alarmsService.addCommentAlarm(userIdx, targetUserIdx, commentsDto.getFeedIdx(), fileIdx);
			}
			// 알림 전송
			AlarmsUserDto alarmsUserDto = alarmsService.findPushInfo(userIdx, targetUserIdx);
			if (alarmsUserDto.getDeviceToken() != null) {
				fcmService.sendMessageTo(alarmsUserDto, 2);
			}
			return ApiResponse.success(SuccessCode.CREATE_COMMENT);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 댓글 등록 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "피드 댓글 삭제", notes = "댓글 번호에 해당하는 댓글을 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{commentIdx}")
	public ApiResponse<?> deleteComment(@PathVariable("commentIdx") int commentIdx,
			@RequestHeader("access_token") String accessToken) throws Exception {
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
	public ApiResponse<?> commentList(@PathVariable("feedIdx") int feedIdx,
			@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("feedIdx - 호출");

		try {
			List<CommentsListDto> commentList = commentsService.commentList(feedIdx);
			for (int i = 0; i < commentList.size(); i++) {
				Map<String, String> file = fileService.findFile(commentList.get(i).getFileIdx(), filePath);
				commentList.get(i).setBase64(file.get("base64"));
				commentList.get(i).setExtension(file.get("extension"));
			}
			System.out.println(commentList);
			return ApiResponse.success(SuccessCode.READ_COMMENT_LIST, commentList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 댓글 리스트 불러오는 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

}
