package com.ssafy.mindder.searches.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.searches.model.BooksDto;
import com.ssafy.mindder.searches.model.service.SearchesService;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.UnicodeKorean;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/searches")
public class SearchesController {
	@Autowired
	private SearchesService searchesService;
	@Autowired
	private JwtService jwtService;
	UnicodeKorean unicodeKorean = new UnicodeKorean();
	private static final Logger logger = LoggerFactory.getLogger(FeedsController.class);

	@GetMapping("/users/{word}")
	public ApiResponse<?> searchUser(@PathVariable("word") String word) {

		try {
			return ApiResponse.success(SuccessCode.READ_SEARCHES_USER,
					searchesService.findUser(unicodeKorean.KtoE(word)));
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/hash/{word}")
	public ApiResponse<?> searchHash(@PathVariable("word") String word) {

		try {
			return ApiResponse.success(SuccessCode.READ_SEARCHES_HASH,
					searchesService.findHash(unicodeKorean.KtoE(word)));
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/books")
	public ApiResponse<?> searchbookList(@RequestHeader("access_token") String accessToken) {

		logger.debug("searchbookList - 호출");
		
		try {
			int userIdx = jwtService.getUserIdx(accessToken);
			String keyword = searchesService.findKeyword(userIdx);
			if (keyword == null) {
				keyword = "감성";
			}
			String url = "https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&KeyWord=" + keyword
					+ "&KeyRecentPublish=0&OutStock=0&ViewType=Detail&SortOrder=2&CustReviewCount=0&CustReviewRank=0&KeyFullWord="
					+ keyword + "&KeyLastWord=" + keyword
					+ "&CategorySearch=&chkKeyTitle=&chkKeyAuthor=&chkKeyPublisher=&chkKeyISBN=&chkKeyTag=&chkKeyTOC=&chkKeySubject=&ViewRowCount=25&SuggestKeyWord=";
			Document doc = null;
			doc = Jsoup.connect(url).get();
			Elements elements = doc.select("div#Search3_Result div.ss_book_box");
			List<BooksDto> bookList = new ArrayList<>();
			
			int arr[] = new int[3];
			Random random = new Random();
			for (int i = 0; i < 3; i++) {
				arr[i] = random.nextInt(25);
				for (int j = 0; j < i; j++) {
					if (arr[i] == arr[j]) i--;
				}
			}
			
			for (int idx : arr) {
				BooksDto booksDto = new BooksDto();
				String title = elements.get(idx).select("a.bo3").text();
				String link = elements.get(idx).select("a").attr("href");
				String img = elements.get(idx).select("img.front_cover").attr("src");
				if (img == "") {
					img = elements.get(idx).select("img.i_cover").attr("src");
					if (img == "") {
						img = elements.get(idx).select("img").attr("src");
					}
				}
				booksDto.setTitle(title);
				booksDto.setLink(link);
				booksDto.setImage(img);
				bookList.add(booksDto);
			}

			return ApiResponse.success(SuccessCode.READ_BOOK_LIST, bookList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("searchbookList - 도서 목록 조회 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
