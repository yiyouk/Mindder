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

import com.ssafy.mindder.users.controller.UsersController;
import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.mapper.UsersMapper;
import com.ssafy.mindder.users.model.service.UsersService;
import com.ssafy.mindder.users.model.service.UsersServiceImpl;
import com.ssafy.mindder.util.UnicodeKorean;

@SpringBootTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class MindderApplicationTests {
	UnicodeKorean unicodeKorean = new UnicodeKorean();
	@Autowired
	UsersController usersController;
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
		//로그인
		UsersDto user = new UsersDto();
		user.setEmail("temp");
		user.setPassword("1234");
		
		Map<String, String> loginUser =(Map<String, String>) usersController.login(user).getData();
		assertNotNull(loginUser);
		System.out.println(loginUser);
		
		//회원 정보 변경
		user = new UsersDto();
		user.setNickname("테스트4");
		user.setEmoteColorIdx(5);
		user.setFindTag(unicodeKorean.KtoE(user.getNickname()));
		user.setFileIdx(305);
		String accessToken = loginUser.get("accessToken");
		assertNotNull(usersController.updateUser(accessToken, user));

		//비밀번호 변경
		user = new UsersDto();
		user.setPassword("1111");
		assertEquals(usersController.changePassword(accessToken, user).getMessage(), "비밀번호 변경 성공");
		
		//비밀번호 일치 여부 확인
		user = new UsersDto();
		user.setPassword("1111");
		assertEquals(usersController.findpassword(accessToken, user).getMessage(), "유저 비밀번호 일치 여부 확인 성공");
		
		//로그아웃
		assertEquals(usersController.logout(accessToken).getMessage(), "유저 로그아웃 성공");
		
		//회원 탈퇴
		assertEquals(usersController.deleteUser(accessToken).getMessage(), "유저 정보 삭제 성공");
	}
	
}
