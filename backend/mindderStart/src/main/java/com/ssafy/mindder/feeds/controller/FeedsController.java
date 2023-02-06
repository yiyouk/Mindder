package com.ssafy.mindder.feeds.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsBearDto;
import com.ssafy.mindder.feeds.model.FeedsCrawlDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsNeighborDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.feeds.model.service.FeedsService;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.util.JwtService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/feeds")
@RestController
public class FeedsController {

	@Autowired
	private FeedsService feedsService;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private FileService fileService;
	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@ApiOperation(value = "메인 피드 글 작성", notes = "새로운 피드의 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = FeedsDto.class)
	@PostMapping
	public ApiResponse<?> writeFeeds(@RequestBody FeedsDto feedsDto, @RequestHeader("access_token") String accessToken)
			throws Exception {
		logger.info("writeArticle - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			feedsDto.setUserIdx(userIdx);
			feedsService.writeFeed(feedsDto);
			return ApiResponse.success(SuccessCode.CREATE_MAIN_FEED);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 등록 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "메인 피드 글 수정", notes = "수정할 피드의 정보를 입력한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PatchMapping
	public ApiResponse<?> modifyFeed(@RequestHeader("access_token") String accessToken,
			@RequestBody FeedsUpdateDto feedsDto) throws Exception {
		logger.info("modifyFeed - 호출 {}", feedsDto);

		try {
			feedsService.modifyFeed(feedsDto);
			return ApiResponse.success(SuccessCode.UPDATE_MAIN_FEED);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("modifyFeed- 피드 글 수정 중 에러 발생 ");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "메인 피드 글 삭제", notes = "글번호에 해당하는 게시글의 정보를 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{feedIdx}")
	public ApiResponse<?> deleteFeed(@RequestHeader("access_token") String accessToken,
			@PathVariable("feedIdx") @ApiParam(value = "삭제할 글의 글번호.", required = true) int feedIdx) throws Exception {
		logger.info("deleteFeed - 호출");

		try {
			feedsService.deleteFeed(feedIdx);
			return ApiResponse.success(SuccessCode.DELETE_MAIN_FEED);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("deleteFeed - 피드 글 삭제 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "메인 피드 글 상세보기", notes = "글번호에 해당하는 게시글의 정보를 반환한다.", response = FeedsParameterDto.class)
	@GetMapping("/{feedIdx}")
	public ApiResponse<?> getFeed(@Value("${file.path.upload-files}") String filePath,
			@PathVariable("feedIdx") @ApiParam(value = "얻어올 글의 글번호.", required = true) int feedIdx,
			@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("getFeed - 호출 : " + feedIdx);
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			FeedsParameterDto feedDetail = feedsService.getFeed(feedIdx, userIdx);

			// 사용자 -> 메인 스크랩 여부 코드
			boolean checkMyscrap = feedsService.myScrap(feedIdx, userIdx);
			if (checkMyscrap) {
				feedDetail.setMyScrap(checkMyscrap);
			}

			// 이미지
			Map<String, String> file = fileService.findFile(feedDetail.getFileIdx(), filePath);
			feedDetail.setBase64(file.get("base64"));
			feedDetail.setExtension(file.get("extension"));
			System.out.println(feedDetail);

			// 메인 피드글 여부 확인
			if (Objects.isNull(feedDetail)) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_FEED_EXCEPTION);
			}
			return ApiResponse.success(SuccessCode.READ_DETAIL_MAIN_FEED, feedDetail);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("getFeed - 피드 글 상세 보기 중 에러 발생 ");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

	// 팔로잉 하는 이웃의 피드 리스트 조회
	@ApiOperation(value = "팔로잉 하는 이웃의 피드 조회", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("/neighbors")
	public ApiResponse<?> neighborFeed(@Value("${file.path.upload-files}") String filePath,
			@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("userIdx - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);

			List<FeedsNeighborDto> neighborList = feedsService.neighborFeed(userIdx);

			// 이미지 관련 코드 -> 이게 맞나,,,?
			for (int i = 0; i < neighborList.size(); i++) {
				Map<String, String> file = fileService.findFile(neighborList.get(i).getFileIdx(), filePath);
				neighborList.get(i).setBase64(file.get("base64"));
				neighborList.get(i).setExtension(file.get("extension"));
			}

			System.out.println(neighborList);
			return ApiResponse.success(SuccessCode.READ_NEIGHBORS_FEED_LIST, neighborList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("neighborFeed - 팔로잉 하는 이웃의 피드 글 불러오는 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 이미지 크롤링
	@ApiOperation(value = "이미지 크롤링 ", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("/crawling/{color}")
	public ApiResponse<?> crawling(@PathVariable("color") String color) throws Exception {
		// 일단 변수 반영 x, 메인 이미지만 가져와보기
//      String url = "https://www.google.com/search?q=purple+drawing&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjW1rb2k-78AhWSFIgKHTgUD_8Q_AUoAXoECAEQAw&biw=1536&bih=746&dpr=1.25";
//
//      Document doc = Jsoup.connect(url).get();
//      Thread.sleep(1000);
//      
//      List<FeedsCrawlDto> list = new ArrayList<>();
//      Elements links = doc.select("div.isv-r");

		logger.debug("crawling - 호출 : " + color);

		try {
			String url = "https://www.shutterstock.com/ko/search/" + color
					+ "-draw?c3apidt=p67950521402&cr=ec&gclid=Cj0KCQiAz9ieBhCIARIsACB0oGJBB98nHvnTniAE-kjspSDdkQWfpIcWxlh0IFv7ed-Mr8cMmg1vLicaAiz5EALw_wcB&gclsrc=aw.ds&kw=%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%8B%A4%EC%9A%B4&pl=PPC_GOO_KR_IG-567002744555";

			Document doc = Jsoup.connect(url).get();
			List<FeedsCrawlDto> list = new ArrayList<>();

			Elements links = doc.select(".mui-b5j3lh-item-sstkGridItem-item");

			int cnt = 1;
			for (Element e : links) {
				if (cnt % 10 != 0 && cnt <= 9) {
					FeedsCrawlDto imgLists = new FeedsCrawlDto();

					// 해당 링크 주소
					String frontUrl = "https://www.shutterstock.com/";
					imgLists.setUrl(frontUrl + e.select("a").get(0).attr("href"));

					imgLists.setImg(e.select("img").get(0).attr("src"));
					list.add(imgLists);
				}
				cnt++;
			}
			return ApiResponse.success(SuccessCode.READ_IMAGE_CRAAWLING_COLOR, list);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug(" crawling- 이미지 크롤링 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 완성된 곰돌이 이미지 조회 -> request body
	@ApiOperation(value = "완성된 곰돌이 이미지 조회 ", notes = "완성된 곰돌이 이미지를 조회한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping("/emote-complete")
	public ApiResponse<?> searchFile(
			@RequestBody @ApiParam(value = "완성된 곰돌이 이미지 ", required = true) FeedsBearDto feedsBearDto)
			throws Exception {
		logger.info("searchFile - 호출");
		try {

			FeedsBearDto fileIdx = feedsService.searchFile(feedsBearDto);
			if (fileIdx != null)
				return ApiResponse.success(SuccessCode.READ_FIND_BEAR, fileIdx);
			else
				return ApiResponse.error(ErrorCode.NOT_FOUND_FEED_EXCEPTION);

		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("searchFile - 곰돌이 이미지 불러오는 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 메인 페이지 추천 피드 조회
	// 유저가 최근에 선택했던 감정 색상을 기준으로 추천 페이지 제공-> emote_color_idx를 기준!
	// 색상이 동일하면서 hit수가 높은 순으로 조회
	// emote_color_idx=#{emoteColorIdx}
	// order by hit DESC

	@ApiOperation(value = "메인 페이지 추천 피드 조회", notes = "메인 페이지의 추천 피드를 반환한다.", response = List.class)
	@GetMapping("/recommendation")
	public ApiResponse<?> recommendation(@Value("${file.path.upload-files}") String filePath,
			@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("recommendation - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> recommendation = feedsService.recommendation(userIdx);
			System.out.println(recommendation);

			// 이미지 관련 코드 -> 이게 맞나,,,?
			for (int i = 0; i < recommendation.size(); i++) {
				Map<String, String> file = fileService.findFile(recommendation.get(i).getFileIdx(), filePath);
				recommendation.get(i).setBase64(file.get("base64"));
				recommendation.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_RECOMMENDATION_FEED, recommendation);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("recommendation - 추천 글 불러오기 실패");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 유사 감정 색상 피드 목록 조회
	@ApiOperation(value = "유사 감정 색상 피드 목록 조회", notes = "유저가 선택한 최신 감정 태그를 바탕으로 추천", response = List.class)
	@GetMapping("/similarity-color")
	public ApiResponse<?> similarColorFeed(@Value("${file.path.upload-files}") String filePath,
			@RequestHeader("access_token") String accessToken) throws Exception {
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedsNeighborDto> similarEmotion = feedsService.similarColorFeed(userIdx);
			System.out.println(similarEmotion);

			// 이미지 관련 코드 -> 이게 맞나,,,?
			for (int i = 0; i < similarEmotion.size(); i++) {
				Map<String, String> file = fileService.findFile(similarEmotion.get(i).getFileIdx(), filePath);
				similarEmotion.get(i).setBase64(file.get("base64"));
				similarEmotion.get(i).setExtension(file.get("extension"));
			}

			return ApiResponse.success(SuccessCode.READ_SIMILARCOLOR_FEED, similarEmotion);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("similarEmotionFeed - 유사 감정 태그 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}