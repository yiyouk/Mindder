package com.ssafy.mindder.feeds.controller;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.model.FeedsCrawlDto;
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

	@ApiOperation(value = "메인 피드 글 작성", notes = "새로운 피드의 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ApiResponse<?> writeFeeds(@RequestBody @ApiParam(value = "피드 정보.", required = true) FeedsDto feedsDto)
			throws Exception {
		logger.info("writeArticle - 호출");
		try {
			feedsService.writeFeed(feedsDto);
			return ApiResponse.success(SuccessCode.CREATE_MAIN_FEED);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("writeFeeds - 메인 피드 등록 중 에러 발생");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "메인 피드 글 수정", notes = "수정할 피드의 정보를 입력한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping
	public ApiResponse<?> modifyFeed(@RequestBody @ApiParam(value = "수정할 글정보.", required = true) FeedsDto feedsDto)
			throws Exception {
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
	public ApiResponse<?> deleteFeed(
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
			@PathVariable("feedIdx") @ApiParam(value = "얻어올 글의 글번호.", required = true) int feedIdx) throws Exception {
		logger.info("getFeed - 호출 : " + feedIdx);
		try {
			FeedsParameterDto feedDetail = feedsService.getFeed(feedIdx);
			return ApiResponse.success(SuccessCode.READ_DETAIL_MAIN_FEED, feedDetail);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("getFeed - 피드 글 상세 보기 중 에러 발생 ");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 팔로잉 하는 이웃의 피드 리스트 조회
	@ApiOperation(value = "팔로잉 하는 이웃의 피드 조회", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("neighbors/{userIdx}")
	public ApiResponse<?> neighborFeed(
			@PathVariable("userIdx") @ApiParam(value = "유저 번호 ", required = true) int userIdx) throws Exception {
		logger.info("userIdx - 호출");
		try {
			List<FeedsNeighborDto> neighborList = feedsService.neighborFeed(userIdx);
			return ApiResponse.success(SuccessCode.READ_NEIGHBORS_FEED_LIST, neighborList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("neighborFeed - 팔로잉 하는 이웃의 피드 글 불러오는 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 핀터레스트 이미지 크롤링
	@ApiOperation(value = "이미지 크롤링 ", notes = "이웃의 피드를 반환한다.", response = List.class)
	@GetMapping("/crawling/{color}")
	public ApiResponse<?> crawling(String color) throws Exception {
		// 일단 변수 반영 x, 메인 이미지만 가져와보기
//		String url = "https://www.google.com/search?q=purple+drawing&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjW1rb2k-78AhWSFIgKHTgUD_8Q_AUoAXoECAEQAw&biw=1536&bih=746&dpr=1.25";
//
//		Document doc = Jsoup.connect(url).get();
//		Thread.sleep(1000);
//		
//		List<FeedsCrawlDto> list = new ArrayList<>();
//		Elements links = doc.select("div.isv-r");

		logger.debug("crawling - 호출 : " + color);

		try {
			String url = "https://www.shutterstock.com/ko/search/" + color
					+ "-draw?c3apidt=p67950521402&cr=ec&gclid=Cj0KCQiAz9ieBhCIARIsACB0oGJBB98nHvnTniAE-kjspSDdkQWfpIcWxlh0IFv7ed-Mr8cMmg1vLicaAiz5EALw_wcB&gclsrc=aw.ds&kw=%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%8B%A4%EC%9A%B4&pl=PPC_GOO_KR_IG-567002744555";

			Document doc = Jsoup.connect(url).get();
			Thread.sleep(1000);
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

}