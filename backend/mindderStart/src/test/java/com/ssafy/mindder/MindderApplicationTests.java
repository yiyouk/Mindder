package com.ssafy.mindder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Map;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.mindder.feeds.controller.FeedsController;
import com.ssafy.mindder.feeds.model.FeedsDto;
import com.ssafy.mindder.feeds.model.FeedsUpdateDto;
import com.ssafy.mindder.users.controller.UsersController;
import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.util.UnicodeKorean;

@SpringBootTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class MindderApplicationTests {
	UnicodeKorean unicodeKorean = new UnicodeKorean();

	// 유저
	@Autowired
	UsersController usersController;

	// 피드
	@Autowired
	FeedsController feedsController;

	///////////////////////////////////////////////////////////

	@Test
	@Order(1)
	void join() throws Exception {
		UsersDto user = new UsersDto();
		user.setEmail("temp");
		usersController.checkEmail(user.getEmail());
		user.setPassword("1234");
		user.setNickname("테스트");
		user.setEmoteColorIdx(1);
		user.setSocialId("@mindder");
		user.setFindTag(unicodeKorean.KtoE(user.getNickname()));
		usersController.join(user);
	}

	@Test
	@Order(2)
	void userTest() throws Exception {
		// 로그인
		UsersDto user = new UsersDto();
		user.setEmail("temp");
		user.setPassword("1234");

		Map<String, String> loginUser = (Map<String, String>) usersController.login(user).getData();
		assertNotNull(loginUser);
		System.out.println(loginUser);

		// 회원 정보 변경
		user = new UsersDto();
		user.setNickname("테스트4");
		user.setEmoteColorIdx(5);
		user.setFindTag(unicodeKorean.KtoE(user.getNickname()));
		user.setFileIdx(305);
		String accessToken = loginUser.get("accessToken");
		assertNotNull(usersController.updateUser(accessToken, user));

		// 비밀번호 변경
		user = new UsersDto();
		user.setPassword("1111");
		assertEquals(usersController.changePassword(accessToken, user).getMessage(), "비밀번호 변경 성공");

		// 비밀번호 일치 여부 확인
		user = new UsersDto();
		user.setPassword("1111");
		assertEquals(usersController.findpassword(accessToken, user).getMessage(), "유저 비밀번호 일치 여부 확인 성공");

		// 로그아웃
		assertEquals(usersController.logout(accessToken).getMessage(), "유저 로그아웃 성공");

		// 회원 탈퇴
		assertEquals(usersController.deleteUser(accessToken).getMessage(), "유저 정보 삭제 성공");
	}

	@Test
	@Order(3)
	void mainFeedTest() throws Exception {

		// 로그인
		UsersDto user = new UsersDto();
		user.setEmail("temp");
		user.setPassword("1234");

		Map<String, String> loginUser = (Map<String, String>) usersController.login(user).getData();
		assertNotNull(loginUser);
		System.out.println(loginUser);
		String accessToken = loginUser.get("accessToken");

		// 피드 작성
		FeedsDto feedsDto = new FeedsDto();
		feedsDto.setMainText("테스트1 중 입니다.");
		feedsDto.setEmoteColorIdx(1);
		feedsDto.setEmoteIdx(1);
		feedsDto.setNormalTag("#테스트");
		feedsDto.setPublic(true);
		feedsDto.setFileIdx(300);
		assertNotNull(feedsController.writeFeeds(feedsDto, accessToken).getMessage(), "피드 글 작성 성공!");

		// 피드 수정
		FeedsUpdateDto feedsUpdate = new FeedsUpdateDto();
		feedsUpdate = new FeedsUpdateDto();
		feedsUpdate.setNormalTag("#테스트#변경");
		feedsUpdate.setMainText("테스트2 중 입니다");
		feedsUpdate.setPublic(false);
		assertNotNull(feedsController.modifyFeed(accessToken, feedsUpdate).getMessage(), "피디 글 수정 성공!");

		// 피드 삭제
		int feedIdx = 7;
		assertNotNull(feedsController.deleteFeed(accessToken, feedIdx).getMessage(), "피디 글 삭제 성공!");

		// 피드 상세 조회
		assertNotNull(feedsController.deleteFeed(accessToken, feedIdx).getMessage(), "피디 글 삭제 성공!");

		// 메인화면 -> 추천 피드 목록 조회(3개)

		// 사용자 이웃 피드 목록 조회

		// 주간 인기 피드 리스트 조회

		// 실시간 작성된 피드 리스트 조회

	}

}
