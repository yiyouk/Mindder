package com.ssafy.mindder.draw.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.mindder.draw.model.drawDto;
import com.ssafy.mindder.feeds.model.FeedsDto;

@Controller
@RequestMapping("/draws")
public class drawController {
	private static final Logger logger = LoggerFactory.getLogger(FeedsDto.class);
	public static HashMap<String, String> map;

	@GetMapping("/crawl")
	public ResponseEntity<List<drawDto>> crawling() throws Exception {
		String url = "https://www.pinterest.co.kr/search/pins/?q=purple%20drawing&rs=typed";

		Document doc = Jsoup.connect(url).get();
		List<FeedsDto> list = new ArrayList<>();

		Element drawslist = doc.select(".section_headline .headline_list").get(0);
		Elements drawsElements = drawslist.select("li");

		// https://www.pinterest.co.kr/search/pins/?q=%EB%B3%B4%EB%9D%BC%EC%83%89&rs=typed

		return null;

	}

}
