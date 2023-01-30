package com.ssafy.mindder.scraps.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.ssafy.mindder.scraps.model.service.ScrapsService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;

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
	@PostMapping("/scraps/{feedIdx}")
	public ApiResponse<?> scrapAdd(@RequestParam("access_token") String accessToken, @RequestParam int feedIdx) {

		logger.debug("scrapAdd - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);

			scrapsService.addScrap(userIdx, feedIdx);
			return ApiResponse.success(SuccessCode.CREATE_SCRAP);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("scrapAdd - 스크랩 등록 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
