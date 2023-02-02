package com.ssafy.mindder.users.model.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.ssafy.mindder.users.model.UsersDto;
import com.ssafy.mindder.users.model.mapper.UsersMapper;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	UsersMapper usersMapper;

	@Override
	public UsersDto searchUser(String email) throws Exception {
		return usersMapper.searchUser(email);
	}

	@Override
	public void joinUser(UsersDto usersdto) throws Exception {
		usersMapper.joinUser(usersdto);

	}

	@Override
	public int checkNickname(String nickname) throws Exception {
		return usersMapper.checkNickname(nickname);
	}

	@Override
	public UsersDto login(UsersDto usersdto) throws Exception {
		return usersMapper.login(usersdto);
	}

	@Override
	public void addToken(UsersDto usersdto) throws Exception {
		usersMapper.addToken(usersdto);

	}

	@Override
	public UsersDto findSocialKakaoID(String userid) throws Exception {
		return usersMapper.findSocialKakaoID(userid);
	}

	@Override
	public void updateUser(UsersDto usersdto) throws Exception {
		usersMapper.updateUser(usersdto);
	}

	@Override
	public void deleteUser(int userIdx) throws Exception {
		usersMapper.deleteUser(userIdx);
	}

	@Override
	public void logout(int userIdx) throws Exception {
		usersMapper.logout(userIdx);
	}

	@Override
	public String findpassword(int userIdx) throws Exception {
		return usersMapper.findpassword(userIdx);
	}

	@Override
	public int checkEmail(String email) throws Exception {
		return usersMapper.checkEmail(email);
	}

	@Override
	public void changePassword(UsersDto usersDto) throws Exception {
		usersMapper.changePassword(usersDto);
	}

	@Override
	public Map<String, String> getUserInfo(String access_token) throws IOException {
		String host = "https://kapi.kakao.com/v2/user/me";
		Map<String, String> result = new HashMap<>();
		try {
			URL url = new URL(host);

			HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
			urlConnection.setRequestMethod("GET");

			int responseCode = urlConnection.getResponseCode();
			System.out.println("responseCode = " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
			String line = "";
			String res = "";
			while ((line = br.readLine()) != null) {
				res += line;
			}

			System.out.println("res = " + res);

			Gson gson = new Gson();
			Map<String, Object> obj = gson.fromJson(res, Map.class);
			Map<String, Object> kakao_account = gson.fromJson(obj.get("kakao_account").toString(), Map.class);
			Map<String, Object> properties = gson.fromJson(obj.get("properties").toString(), Map.class);

			result.put("id", obj.get("id").toString());
			result.put("nickname", properties.get("nickname").toString());

			br.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public Map<String, String> getToken(String code) throws Exception {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";
		Map<String, String> rt = new HashMap<>();
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=dc63597430966307c80d8e0e8c0d9b8a"); // TODO REST_API_KEY 입력
			sb.append("&redirect_uri=http://localhost:9999/users/social/kakao"); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);
			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			Gson gson = new Gson();
			Map<String, Object> map = gson.fromJson(result, Map.class);
			access_Token = (String) map.get("access_token");
			refresh_Token = (String) map.get("refresh_token");
			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);
			rt.put("access_token", access_Token);
			rt.put("refresh_token", refresh_Token);
			br.close();
			bw.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

		return rt;
	}

	@Override
	public String findUserIdx(String email) throws Exception {
		return usersMapper.selectUserIdx(email);
	}

	@Override
	public void deletedJoinUser(UsersDto usersdto) throws Exception {
		usersMapper.deletedJoinUser(usersdto);
		
	}

}
