package com.ssafy.mindder.users.controller;

import java.util.HashMap;
import java.util.Map;

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

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.email.model.EmailService;
import com.ssafy.mindder.file.model.service.FileService;
import com.ssafy.mindder.users.model.LoginResponseDto;
import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.service.UsersService;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.SHA256;
import com.ssafy.mindder.util.UnicodeKorean;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	private UsersService usersService;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private FileService fileService;
	@Autowired
	private EmailService emailService;
	UnicodeKorean unicodeKorean = new UnicodeKorean();
	private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

	@Value("${file.path.upload-files}")
	private String filePath;

	private static class Check {
		@JsonProperty
		boolean available;

		public Check(boolean available) {
			this.available = available;
		}
	}

	@ApiOperation(value = "패스워드 변경 완료")
	@PatchMapping("/change-password")
	public ApiResponse<?> changePassword(@RequestHeader("access_token") String accessToken,
			@RequestBody UsersDto usersDto) {
		try {
			usersDto.setUserIdx(jwtService.getUserIdx(accessToken));
			usersDto.setPassword(SHA256.encrypt(usersDto.getPassword()));
			usersService.changePassword(usersDto);
			return ApiResponse.success(SuccessCode.UPDATE_PASSWORD);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "이메일 중복 여부를 반환한다")
	@GetMapping("/check-email/{email}")
	public ApiResponse<?> checkEmail(@PathVariable("email") String email) {
		logger.debug("checkEmail - 호출");
		try {
			int check = 0;
			Check emailCheck = new Check(false);
			check = usersService.checkEmail(email);
			if (check == 0) {
				emailCheck.available = true;
				return ApiResponse.success(SuccessCode.READ_CHECK_EMIAL, emailCheck);
			} else {
				return ApiResponse.success(SuccessCode.READ_CHECK_EMIAL, emailCheck);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "엑세스 토큰을 통해 유저 삭제", response = String.class)
	@DeleteMapping
	public ApiResponse<?> deleteUser(@RequestHeader("access_token") String accessToken) {
		try {
			int idx = jwtService.getUserIdx(accessToken);
			usersService.deleteUser(idx);
			return ApiResponse.success(SuccessCode.DELETE_USER);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "엑세스 토큰을 통해 유저 업데이트", response = String.class)
	@PatchMapping
	public ApiResponse<?> updateUser(@RequestHeader("access_token") String accessToken,
			@RequestBody UsersDto usersDto) {
		try {
			int idx = jwtService.getUserIdx(accessToken);
			usersDto.setUserIdx(idx);
			usersDto.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
			usersService.updateUser(usersDto);
			return ApiResponse.success(SuccessCode.UPDATE_USER, fileService.findFile(usersDto.getFileIdx(), filePath));
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("updateUser - 정보수정 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "카카오 로그인 성공 여부를 반환한다.", response = String.class)
	@GetMapping("/social/kakao")
	public ApiResponse<?> social(@RequestParam String code) {
		Map<String, String> token;
		Map<String, String> userIO;
		Map<String, String> user = new HashMap<String, String>();
		try {
			token = usersService.getToken(code);
			userIO = usersService.getUserInfo(token.get("access_token"));
			UsersDto usersDto = new UsersDto();
			usersDto.setSocialId(userIO.get("id") + "@Kakao");
			usersDto.setNickname(userIO.get("nickname"));
			usersDto = usersService.findSocialKakaoID(usersDto.getSocialId());
			System.out.println(usersDto);
			if (usersDto != null) {
				if (!usersDto.isDeleted()) {
					String accessToken = jwtService.createAccessToken("useridx", usersDto.getUserIdx());
					user.put("userIdx", usersDto.getUserIdx() + "");
					user.put("nickname", usersDto.getNickname());
					user.put("accessToken", accessToken);
					return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
				} else {
					UsersDto temp = new UsersDto();
					temp.setUserIdx(usersDto.getUserIdx());
					temp.setSocialId(userIO.get("id") + "@Kakao");
					temp.setEmail("카카오유저");
					temp.setPassword(SHA256.encrypt(userIO.get("id")));
					temp.setNickname(userIO.get("nickname"));
					temp.setEmoteColorIdx(1);
					temp.setFileIdx(305);
					temp.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
					usersService.deletedJoinUser(usersDto);
					String accessToken = jwtService.createAccessToken("useridx", usersDto.getUserIdx());
					user.put("userIdx", usersDto.getUserIdx() + "");
					user.put("nickname", usersDto.getNickname());
					user.put("accessToken", accessToken);
					return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
				}
			} else {
				logger.debug("socialLogin - 회원정보 없음");
				usersDto = new UsersDto();
				usersDto.setSocialId(userIO.get("id") + "@Kakao");
				usersDto.setEmail("카카오유저");
				usersDto.setPassword(SHA256.encrypt(userIO.get("id")));
				usersDto.setNickname(userIO.get("nickname"));
				usersDto.setEmoteColorIdx(1);
				usersDto.setFileIdx(305);
				usersDto.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
				int idx = usersService.joinSocialKakaoID(usersDto);
				String accessToken = jwtService.createAccessToken("useridx", idx);
				user.put("userIdx", idx + "");
				user.put("nickname", usersDto.getNickname());
				user.put("accessToken", accessToken);
				return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("socialLogin - 로그인 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@ApiOperation(value = "네이버 로그인 성공 여부를 반환한다.", response = String.class)
	@GetMapping("/social/naver")
	public ApiResponse<?> socialNaver(@RequestParam String code) {
		Map<String, String> token;
		Map<String, String> userIO;
		Map<String, String> user = new HashMap<String, String>();
		try {
			token = usersService.getNaverToken(code);
			userIO = usersService.getNaverUserInfo(token.get("access_token"));
			UsersDto usersDto = new UsersDto();
			usersDto.setSocialId(userIO.get("id") + "@Naver");
			usersDto.setNickname(userIO.get("nickname"));
			usersDto = usersService.findSocialKakaoID(usersDto.getSocialId());
			System.out.println(usersDto);
			if (usersDto != null) {
				if(!usersDto.isDeleted()) {
					String accessToken = jwtService.createAccessToken("useridx",  usersDto.getUserIdx());
					user.put("userIdx", usersDto.getUserIdx() + "");
					user.put("nickname", usersDto.getNickname());
					user.put("accessToken", accessToken);
					return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
				}else {
					UsersDto temp = new UsersDto();
					temp.setUserIdx(usersDto.getUserIdx());
					temp.setSocialId(userIO.get("id") + "@Naver");
					temp.setEmail("네이버유저");
					temp.setPassword(SHA256.encrypt(userIO.get("id")));
					temp.setNickname(userIO.get("nickname"));
					temp.setEmoteColorIdx(1);
					temp.setFileIdx(305);
					temp.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
					usersService.deletedJoinUser(usersDto);
					String accessToken = jwtService.createAccessToken("useridx",  usersDto.getUserIdx());
					user.put("userIdx", usersDto.getUserIdx() + "");
					user.put("nickname", usersDto.getNickname());
					user.put("accessToken", accessToken);
					return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
				}
			}else {
				logger.debug("socialLogin - 회원정보 없음");
				usersDto = new UsersDto();
				usersDto.setSocialId(userIO.get("id") + "@Naver");
				usersDto.setEmail("네이버유저");
				usersDto.setPassword(SHA256.encrypt(userIO.get("id")));
				usersDto.setNickname(userIO.get("nickname"));
				usersDto.setEmoteColorIdx(1);
				usersDto.setFileIdx(305);
				usersDto.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
				int idx  = usersService.joinSocialKakaoID(usersDto);
				String accessToken = jwtService.createAccessToken("useridx",idx);
				user.put("userIdx", idx + "");
				user.put("nickname", usersDto.getNickname());
				user.put("accessToken", accessToken);
				return ApiResponse.success(SuccessCode.READ_KAKAO_LOGIN, user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("socialLogin - 로그인 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@ApiOperation(value = "로그인 성공 여부를 반환한다.", response = String.class)
	@PostMapping("/login")
	public ApiResponse<?> login(@RequestBody UsersDto usersDto) {
		logger.debug("login - 호출");
		usersDto.setPassword(SHA256.encrypt(usersDto.getPassword()));
		try {
			usersDto = usersService.login(usersDto);
			if (usersDto != null && !usersDto.isDeleted()) {
				String accessToken = jwtService.createAccessToken("useridx", usersDto.getUserIdx());
				usersDto.setRefreshToken(jwtService.createRefreshToken("useridx", usersDto.getUserIdx()));
				usersService.addToken(usersDto);
				LoginResponseDto user = new LoginResponseDto(usersDto.getUserIdx(), usersDto.getNickname(), accessToken,
						usersDto.isPushAlarmAgree());

				return ApiResponse.success(SuccessCode.READ_LOGIN, user);
			} else {
				logger.debug("login - 로그인 실패");
				return ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("login - 로그인 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "로그아웃 성공 여부를 반환한다.", response = String.class)
	@GetMapping("/logout")
	public ApiResponse<?> logout(@RequestHeader("access_token") String accessToken) {
		logger.debug("logout - 호출");
		try {
			usersService.logout(jwtService.getUserIdx(accessToken));

			return ApiResponse.success(SuccessCode.READ_LOGOUT);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("logout - 로그아웃 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "비밀번호 일치 여부를 반환한다.", response = String.class)
	@PostMapping("/password")
	public ApiResponse<?> findpassword(@RequestHeader("access_token") String accessToken,
			@RequestBody UsersDto userDto) {
		logger.debug("findpassword - 호출");
		try {
			String tempPwd = usersService.findpassword(jwtService.getUserIdx(accessToken));

			userDto.setPassword(SHA256.encrypt(userDto.getPassword()));
			if (userDto.getPassword().equals(tempPwd)) {
				return ApiResponse.success(SuccessCode.READ_FIND_PWD);
			} else {
				return ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("findpassword - 비밀번호 찾기 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "회원가입 성공 여부를 반환한다.", response = String.class)
	@PostMapping("/join")
	public ApiResponse<?> join(@RequestBody UsersDto usersDto) {
		logger.debug("join - 호출");
		String encryPassword = SHA256.encrypt(usersDto.getPassword());
		try {
			UsersDto temp = usersService.searchUser(usersDto.getEmail());
			usersDto.setPassword(encryPassword);
			usersDto.setFindTag(unicodeKorean.KtoE(usersDto.getNickname()));
			if (temp == null) {
				usersService.joinUser(usersDto);
			} else if (temp.isDeleted()) {
				usersDto.setUserIdx(temp.getUserIdx());
				usersService.deletedJoinUser(usersDto);

			}

			return ApiResponse.success(SuccessCode.CREATE_USER);

		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("join - 회원가입 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);

		}
	}

	@ApiOperation(value = "닉네임 중복 여부를 반환한다.")
	@GetMapping("/check-nickname/{nickname}")
	public ApiResponse<?> checkNickname(@PathVariable("nickname") String nickname) {
		logger.debug("checkNickname - 호출");
		try {
			int check = 0;
			Check nicknameCheck = new Check(false);
			check = usersService.checkNickname(nickname);
			if (check == 0) {
				nicknameCheck.available = true;
				return ApiResponse.success(SuccessCode.READ_CHECK_NICKNAME, nicknameCheck);
			} else {
				return ApiResponse.success(SuccessCode.READ_CHECK_NICKNAME, nicknameCheck);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("checkNickname - 닉네임 체크 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "이메일 인증", response = String.class)
	@GetMapping("/email-confirm/{email}")
	public ApiResponse<?> mailConfirm(@PathVariable @ApiParam(value = "이메일", required = true) String email) {
		logger.info("mailConfirm - 호출 : " + email);
		try {
			String code = emailService.sendSimpleMessage(email);
			logger.info("인증 코드 : " + code);
			return ApiResponse.success(SuccessCode.READ_EMAIL_CONFIRM, code);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("mailConfirm - 이메일 인증 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@ApiOperation(value = "임시 비밀번호 발급")
	@PatchMapping("/temp-password/{email}")
	public ApiResponse<?> tempPasswordModify(@PathVariable @ApiParam(value = "이메일", required = true) String email) {
		logger.info("tempPasswordModify - 호출 : " + email);
		try {
			String tmpPw = emailService.sendSimplePwMessage(email);
			logger.info("임시 비밀번호 : " + tmpPw);
			UsersDto usersDto = new UsersDto();
			String userIdx = usersService.findUserIdx(email);
			if (userIdx == null) {
				return ApiResponse.error(ErrorCode.NOT_FOUND_USER_EXCEPTION);
			} else {
				int idx = Integer.parseInt(userIdx);
				usersDto.setUserIdx(idx);
				usersDto.setPassword(SHA256.encrypt(tmpPw));
			}
			usersService.changePassword(usersDto);
			return ApiResponse.success(SuccessCode.READ_TEMP_PASSWORD, tmpPw);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("tempPasswordModify - 임시 비밀번호 발급 중 에러");
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
