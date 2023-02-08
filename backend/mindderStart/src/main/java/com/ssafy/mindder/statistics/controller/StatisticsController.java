package com.ssafy.mindder.statistics.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.my.model.FeedsRecentDto;
import com.ssafy.mindder.statistics.model.StatisticsDto;
import com.ssafy.mindder.statistics.model.service.StatisticsService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController {

	@Autowired
	private StatisticsService statisticsService;
	@Autowired
	private FileService fileService;

	@Value("${file.path.upload-files}")
	private String filePath;

	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "통계 조회", notes = "통계 정보를 반환한다.", response = FeedsRecentDto.class)
	@GetMapping()
	ApiResponse<?> statisticsList(@RequestHeader("access_token") String accessToken) {

		logger.debug("statisticsList - 호출");
		try {
			List<FeedsRecentDto> statistics = statisticsService.findStatistics();
			for (int i = 0; i < statistics.size(); i++) {
				Map<String, String> file = fileService.findFile(statistics.get(i).getFileIdx(), filePath);
				statistics.get(i).setBase64(file.get("base64"));
				statistics.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_STATISTICS_LIST, statistics);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("statisticsList - 통계 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
