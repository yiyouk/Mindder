package com.ssafy.mindder.users.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.JsonParser;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.service.UsersService;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.SHA256;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	private UsersService usersService;
	@Autowired
	private JwtService jwtService;
	private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@PatchMapping
	public ResponseEntity<?> updateUser(@RequestParam("access_token") String accessToken,@RequestBody UsersDto usersDto){

		Map<String, String> user = new HashMap<String, String>();
		try {
			int idx = jwtService.getUserIdx(accessToken);
			System.out.println(idx);
			usersDto.setUserIdx(idx);
			if(usersDto.getPassword().length()<30) {
				usersDto.setPassword(SHA256.encrypt(usersDto.getPassword()));
			}
			usersService.updateUser(usersDto);

			user.put("nickname", usersDto.getNickname());
			return new ResponseEntity<Map>(user, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("updateUser - 정보 수정 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/social")
	public ResponseEntity<?> social(@RequestParam String code) {
		Map<String, String> token;
		Map<String, String> userIO;
		Map<String, String> user = new HashMap<String, String>();
		try {
			token = usersService.getToken(code);
			userIO = usersService.getUserInfo(token.get("access_token"));
			UsersDto usersDto = usersService.findSocialID(userIO.get("id")); 
			if(usersDto!=null) {
				usersDto.setRefreshToken(token.get("refresh_token"));
				usersService.addToken(usersDto);
				user.put("userIdx", usersDto.getUserIdx() + "");
				user.put("nickname", usersDto.getNickname());
				user.put("accessToken", token.get("access_token"));

				return new ResponseEntity<Map>(user, HttpStatus.OK);
			}else {
				logger.debug("socialLogin - 회원정보 없음");
				return new ResponseEntity<String>(token.get("access_token"), HttpStatus.ACCEPTED);
				//엑세스 토큰 받고 소셜 회원가입 진행
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("socialLogin - 로그인 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "로그인 성공 여부를 반환한다.", response = String.class)
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UsersDto usersDto) {
		logger.debug("login - 호출");
		usersDto.setPassword(SHA256.encrypt(usersDto.getPassword()));
		try {
			int check = 0;
			usersDto = usersService.login(usersDto);
			System.out.println(usersDto);
			if (usersDto != null) {
				String accessToken = jwtService.createAccessToken("useridx", usersDto.getUserIdx());
				usersDto.setRefreshToken(jwtService.createRefreshToken("useridx", usersDto.getUserIdx()));
				usersService.addToken(usersDto);
				Map<String, String> user = new HashMap<String, String>();
				user.put("userIdx", usersDto.getUserIdx() + "");
				user.put("nickname", usersDto.getNickname());
				user.put("accessToken", accessToken);
				System.out.println(jwtService.getUserIdx(accessToken));

				return new ResponseEntity<Map>(user, HttpStatus.OK);
			} else {
				logger.debug("login - 로그인 실패");
				return new ResponseEntity<String>(FAIL, HttpStatus.ACCEPTED);

			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("login - 로그인 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원가입 성공 여부를 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<String> join(@RequestBody UsersDto usersDto) {
		logger.debug("join - 호출");
		String encryPassword = SHA256.encrypt(usersDto.getPassword());
		try {
			UsersDto temp = usersService.searchUser(usersDto.getEmail());

			if (temp != null) {// deleted 체크 회원만 반환
				// usersService.updateMember(usersDto);
				// 수정 구현 후 추가
			} else {
				usersDto.setPassword(encryPassword);
				usersService.joinUser(usersDto);
			}
			System.out.println(usersDto);

			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("join - 회원가입 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@ApiOperation(value = "닉네임 중복 여부를 반환한다.", response = String.class)
	@GetMapping("/{nickname}")
	ResponseEntity<String> checkNickname(@PathVariable("nickname") String nickname) {

		logger.debug("checkNickname - 호출");
		try {
			int check = 0;
			check = usersService.checkNickname(nickname);
			if (check == 1) {
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>(FAIL, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("checkNickname - 닉네임 체크 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "회원 정보를 반환한다.", response = String.class)
	@GetMapping("/information/{userIdx}")
	ResponseEntity<?> checkUser(@PathVariable("userIdx") int userIdx) {

		logger.debug("checkNickname - 호출");
		try {
			UsersDto usersDto = usersService.checkUser(userIdx);
			return new ResponseEntity<UsersDto>(usersDto, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("checkNickname - 닉네임 체크 중 에러");
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
