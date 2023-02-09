package com.ssafy.mindder.searches.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.searches.model.SearchesDto;
import com.ssafy.mindder.searches.model.service.SearchesService;


@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/searches")
public class SearchesController {
	@Autowired
	private SearchesService searchesService;
	
	@GetMapping("/users/{word}")
	public ApiResponse<?> searchUser(@PathVariable("word") String word){
		
		try {
			return ApiResponse.success(SuccessCode.READ_SEARCHES_USER,searchesService.findUser(word));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@GetMapping("/hash/{word}")
	public ApiResponse<?> searchHash(@PathVariable("word") String word){
		
		try {
			return ApiResponse.success(SuccessCode.READ_SEARCHES_HASH,searchesService.findHash(word));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
