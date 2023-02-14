package com.ssafy.mindder.feeds.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.model.FeedListDto;
import com.ssafy.mindder.feeds.model.FeedsBearDto;
import com.ssafy.mindder.feeds.model.FeedsCrawlDto;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsParameterDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.feeds.model.HashParserDto;
import com.ssafy.mindder.feeds.model.service.FeedsService;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.UnicodeKorean;

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
	private UnicodeKorean unicodeKorean = new UnicodeKorean();
	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	// 스웨거 테스트를 위한 전역 변수 설정
	@Value("${file.path.upload-files}")
	private String filePath;

	@GetMapping("/searches/{word}")
	public ApiResponse<?> searchesFeed(@PathVariable("word") String word) {
		try {
			List<FeedListDto> neighborList = feedsService.searchesFeed(word);
			for (int i = 0; i < neighborList.size(); i++) {
				Map<String, String> file = fileService.findFile(neighborList.get(i).getFileIdx(), filePath);
				neighborList.get(i).setBase64(file.get("base64"));
				neighborList.get(i).setExtension(file.get("extension"));
			}
			return ApiResponse.success(SuccessCode.READ_SEARCHE_FEED, neighborList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "메인 피드 글 작성", notes = "새로운 피드의 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = FeedsDto.class)
	@PostMapping
	public ApiResponse<?> writeFeeds(@RequestBody FeedsDto feedsDto, @RequestHeader("access_token") String accessToken)
			throws Exception {
		logger.info("writeArticle - 호출");
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			feedsDto.setUserIdx(userIdx);

			int fileIdx = feedsDto.getFileIdx();
			if (fileIdx == 0) {
				return ApiResponse.error(ErrorCode.VALIDATION_FILEIDX_EXCEPTION);
			}
			feedsService.writeFeed(feedsDto);

			// 해시태그를 작성했다면 파싱해서 넣어줘야함!
			if (feedsDto.getNormalTag() != null) {
				int feedIdx = feedsDto.getFeedIdx();
				List<HashParserDto> hashParser = new ArrayList<>();

				// #을 기준으로 파싱
				String tmp = feedsDto.getNormalTag();
				tmp = tmp.substring(1);
				List<String> normalTag = Arrays.asList(tmp.split("#"));

				int index = 0;
				for (String s : normalTag) {
					HashParserDto hash = new HashParserDto();
					hash.setFeedIdx(feedIdx);
					String tmp2 = '#' + s;
					hash.setHash(tmp2);
					hash.setFind_tag(unicodeKorean.KtoE(tmp2));
					index++;

					hashParser.add(hash);
				}

				System.out.println(hashParser);
				// feedIdx를 기준으로 service에 요청
				feedsService.hashTagParser(hashParser);

			}

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
			// 수정 후에도 네비 페이지 버튼에 머무를 수 있게 설정 -> 아직 구현 안함!

			feedsService.modifyFeed(feedsDto);

			// 만약, 해시태그가 입력된다면 파싱해서 넣어줌
			if (feedsDto.getNormalTag() != null) {
				// feedIdx를 가져옴 -> 추후 해시태그 테이블에서 삭제를 하기 위함
				int feedIdx = feedsDto.getFeedIdx();
				feedsService.hashTagDelete(feedIdx);

				// 해시태그를 파싱해서 다시 넣어주기 위한 코드
				List<HashParserDto> hashParser = new ArrayList<>();

				// #을 기준으로 파싱
				String tmp = feedsDto.getNormalTag();
				tmp = tmp.substring(1);
				List<String> normalTag = Arrays.asList(tmp.split("#"));

				int index = 0;
				for (String s : normalTag) {
					HashParserDto hash = new HashParserDto();
					hash.setFeedIdx(feedIdx);
					String tmp2 = '#' + s;
					hash.setHash(tmp2);
					hash.setFind_tag(unicodeKorean.KtoE(tmp2));
					index++;

					hashParser.add(hash);
				}

				// System.out.println(hashParser);
				// feedIdx를 기준으로 service에 요청
				feedsService.hashTagParser(hashParser);
			}

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
	public ApiResponse<?> getFeed(
//			 @Value("${file.path.upload-files}") String filePath,
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
	public ApiResponse<?> recommendation(@RequestHeader("access_token") String accessToken) throws Exception {
		logger.info("recommendation - 호출");

		try {

			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> recommendation1 = feedsService.recommendation1(userIdx);

			// 회원가입 직후의 유저 -> 회원가입 시 선택했던 컬러로 추천해줌
			if (recommendation1 == null || recommendation1.isEmpty()) {
				List<FeedListDto> recommendation2 = feedsService.recommendation2(userIdx);
				// 이미지 관련 코드 -> 이게 맞나,,,?
				for (int i = 0; i < recommendation2.size(); i++) {
					Map<String, String> file = fileService.findFile(recommendation2.get(i).getFileIdx(), filePath);
					recommendation2.get(i).setBase64(file.get("base64"));
					recommendation2.get(i).setExtension(file.get("extension"));
				}
				return ApiResponse.success(SuccessCode.READ_RECOMMENDATION_FEED, recommendation2);
			}

			// 이미지 관련 코드 -> 이게 맞나,,,?
			for (int i = 0; i < recommendation1.size(); i++) {
				Map<String, String> file = fileService.findFile(recommendation1.get(i).getFileIdx(), filePath);
				recommendation1.get(i).setBase64(file.get("base64"));
				recommendation1.get(i).setExtension(file.get("extension"));
			}

			// 널값이 아닐 때 회원가입 시 선택했던 색으로 조회
			return ApiResponse.success(SuccessCode.READ_RECOMMENDATION_FEED, recommendation1);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("recommendation - 추천 글 불러오기 실패");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 주간 인기글 리스트 조회
	@GetMapping("/popular-feed")
	@ApiOperation(value = "주간 인기글 리스트 조회 ", notes = "주간 인기글 리스트 조회 ", response = List.class)
	public ApiResponse<?> popularFeed(@RequestHeader("access_token") String accessToken,
			@RequestParam("pageNum") int pageNum) throws Exception {
		Map<String, Object> page = new HashMap<>();
		try {
			// 페이징 처리를 위함
			List<FeedListDto> popularArticle = feedsService.popularFeed(pageNum);

			// 이미지 set 코드 작성
			for (int i = 0; i < popularArticle.size(); i++) {
				Map<String, String> file = fileService.findFile(popularArticle.get(i).getFileIdx(), filePath);
				popularArticle.get(i).setBase64(file.get("base64"));
				popularArticle.get(i).setExtension(file.get("extension"));
			}
			page.put("feedList", popularArticle);
			page.put("pageNum", pageNum);
			return ApiResponse.success(SuccessCode.READ_POPULAR_FEED, page);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("popularArticle - 주간 인기글 리스트 조회 실패");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 실시간 작성된 피드 조회
	@GetMapping("/realtime-feed")
	@ApiOperation(value = "실시간 작성된 피드 조회", notes = "실시간 작성된 피드 조회", response = List.class)
	public ApiResponse<?> realtimeFeed(@RequestHeader("access_token") String accessToken,
			@RequestParam("pageNum") int pageNum) throws Exception {
		Map<String, Object> page = new HashMap<>();
		try {

			List<FeedListDto> realtimeFeed = feedsService.realtimeFeed(pageNum);

			// 이미지 set 코드 작성
			for (int i = 0; i < realtimeFeed.size(); i++) {
				Map<String, String> file = fileService.findFile(realtimeFeed.get(i).getFileIdx(), filePath);
				realtimeFeed.get(i).setBase64(file.get("base64"));
				realtimeFeed.get(i).setExtension(file.get("extension"));
			}
			page.put("feedList", realtimeFeed);
			page.put("pageNum", pageNum);
			// System.out.println(page);
			return ApiResponse.success(SuccessCode.READ_RECENT_FEED, page);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("realtimeFeed - 실시간 등록된 게시글 불러오기 실패 ");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 팔로잉 하는 이웃의 피드 리스트 조회
	@ApiOperation(value = "팔로잉 하는 이웃의 피드 조회", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("/neighbors")
	public ApiResponse<?> neighborFeed(@RequestHeader("access_token") String accessToken,
			@RequestParam("pageNum") int pageNum) throws Exception {
		Map<String, Object> page = new HashMap<>();
		try {

			int userIdx = jwtService.getUserIdx(accessToken);
			List<FeedListDto> neighborList = feedsService.neighborFeed(pageNum, userIdx);

			// 이미지 관련 코드 -> 이게 맞나,,,?
			for (int i = 0; i < neighborList.size(); i++) {
				Map<String, String> file = fileService.findFile(neighborList.get(i).getFileIdx(), filePath);
				neighborList.get(i).setBase64(file.get("base64"));
				neighborList.get(i).setExtension(file.get("extension"));
			}

			page.put("feedList", neighborList);
			page.put("pageNum", pageNum);
			return ApiResponse.success(SuccessCode.READ_NEIGHBORS_FEED_LIST, page);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("neighborFeed - 팔로잉 하는 이웃의 피드 글 불러오는 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}