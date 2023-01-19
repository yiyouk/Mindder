package com.ssafy.mindder.users.controller;


import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.service.UsersService;
import com.ssafy.mindder.util.SHA256;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	private UsersService usersService;
	
	
	private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@ApiOperation(value = "회원가입 성공 여부를 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<String> join(@RequestBody UsersDto usersDto){
		logger.debug("join - 호출");
		String encryPassword = SHA256.encrypt(usersDto.getPassword());
		try {
			UsersDto temp = usersService.searchUser(usersDto.getEmail());
			
			if(temp!=null) {//deleted 체크 회원만 반환
				//usersService.updateMember(usersDto);
				//수정 구현 후 추가
        	}
        	else {
        		usersDto.setPassword(encryPassword);
        		usersService.joinUser(usersDto);
        	}
			System.out.println(usersDto);
			
    		return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);


		} catch (Exception e) {
            e.printStackTrace();
    		logger.debug("join - 회원가입 중 에러");
    		return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	@ApiOperation(value = "닉네임 중복 여부를 반환한다.", response = String.class)
	@GetMapping("/{nickname}")
	ResponseEntity<String> checkNickname(@PathVariable("nickname") String nickname){

		logger.debug("checkNickname - 호출");
		try {
			int check = 1;
			check = usersService.checkNickname(nickname);
			if(check == 1) {
	    		return new ResponseEntity<String>("false",HttpStatus.OK);
			}else {
	    		return new ResponseEntity<String>("true",HttpStatus.OK);
			}
				
		} catch (Exception e) {
            e.printStackTrace();
    		logger.debug("checkNickname - 닉네임 체크 중 에러");
    		return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@ApiOperation(value = "회원 정보를 반환한다.", response = String.class)
	@GetMapping("/information/{userIdx}")
	ResponseEntity<?> checkUser(@PathVariable("userIdx") int userIdx){

		logger.debug("checkNickname - 호출");
		try {
			UsersDto userDto = usersService.checkUser(userIdx);
	    	return new ResponseEntity<UsersDto>(userDto,HttpStatus.OK);
		} catch (Exception e) {
            e.printStackTrace();
    		logger.debug("checkNickname - 닉네임 체크 중 에러");
    		return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
