package com.ssafy.mindder.searches.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.searches.model.SearchesDto;
import com.ssafy.mindder.searches.model.service.SearchesService;

@RequestMapping("/searches")
public class SearchesController {
	@Autowired
	private SearchesService searchesService;
	
	@GetMapping("/{word}")
	public ApiResponse<?> search(@PathVariable("word") String word){
		
		try {
			SearchesDto searche = searchesService.find(word);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return null;
	}
}
