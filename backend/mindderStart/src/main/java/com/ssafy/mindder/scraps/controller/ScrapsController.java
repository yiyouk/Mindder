package com.ssafy.mindder.scraps.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.scraps.model.service.ScrapsService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/scraps")
public class ScrapsController {

	@Autowired
	private ScrapsService scrapsService;
	@Autowired
	private JwtService jwtService;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "스크랩 등록", notes = "스크랩을 등록한다.")
	@PostMapping("/{feedIdx}")
	public ApiResponse<?> scrapAdd(@RequestHeader("access_token") String accessToken, @PathVariable("feedIdx") @ApiParam(value = "등록할 피드번호.", required = true) int feedIdx) {

		logger.debug("scrapAdd - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			if (scrapsService.findScrap(userIdx, feedIdx) != null) {
				return ApiResponse.error(ErrorCode.VALIDATION_SCRAP_EXCEPTION);
			}
			scrapsService.addScrap(userIdx, feedIdx);
			return ApiResponse.success(SuccessCode.CREATE_SCRAP);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("scrapAdd - 스크랩 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "스크랩 삭제", notes = "피드 번호에 해당하는 스크랩을 삭제한다.")
	@DeleteMapping("/{feedIdx}")
	public ApiResponse<?> scrapRemove(@RequestHeader("access_token") String accessToken,
			@PathVariable("feedIdx") @ApiParam(value = "삭제할 피드번호.", required = true) int feedIdx) {

		logger.debug("scrapRemove - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			if (scrapsService.findScrap(userIdx, feedIdx) == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_SCRAP_EXCEPTION);
			}
			scrapsService.removeScrap(userIdx, feedIdx);
			return ApiResponse.success(SuccessCode.DELETE_SCRAP);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("scrapRemove - 스크랩 삭제 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "스크랩 목록 조회", notes = "유저 번호에 해당하는 피드의 목록을 반환한다.", response = FeedsParameterDto.class)
	@GetMapping("/my")
	public ApiResponse<?> myScrapList(@RequestHeader("access_token") String accessToken) {

		logger.debug("myScrapList - 호출 : ");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> scrapList = scrapsService.findMyScraps(userIdx);
			return ApiResponse.success(SuccessCode.READ_MY_SCRAP_LIST, scrapList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("myScrapList - 스크랩 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
