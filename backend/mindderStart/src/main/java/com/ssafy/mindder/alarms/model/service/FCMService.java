package com.ssafy.mindder.alarms.model.service;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.ssafy.mindder.alarms.model.AlarmsUserDto;
import com.ssafy.mindder.alarms.model.MessageDto;

import lombok.RequiredArgsConstructor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Component
@RequiredArgsConstructor
public class FCMService {

	private final String API_URL = "https://fcm.googleapis.com/v1/projects/ssafy8th-mindder/messages:send";
	private final ObjectMapper objectMapper;

	public void sendMessageTo(AlarmsUserDto alarmsUserDto, int alarmType) throws IOException {
		String message = makeMessage(alarmsUserDto, alarmType);

		System.out.println(message);
		OkHttpClient client = new OkHttpClient();
		RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
		Request request = new Request.Builder().url(API_URL).post(requestBody)
				.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
				.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8").build();

		Response response = client.newCall(request).execute();

		System.out.println(response.body().string());
	}

	private String makeMessage(AlarmsUserDto alarmsUserDto, int alarmType) throws JsonProcessingException {
		
		String targetToken = alarmsUserDto.getDeviceToken();
		String title = "Mindder";
		String body = null;
		
		if (alarmType == 1) {
			body = "[" + alarmsUserDto.getSenderUserNickname() + "] 님이 회원님을 팔로우하기 시작했습니다.";
		} else if (alarmType == 2) {
			body = "[" + alarmsUserDto.getSenderUserNickname() + "] 님이 회원님의 그림에 댓글을 달았습니다.";
		} else if (alarmType == 3) {
			body = "[" + alarmsUserDto.getSenderUserNickname() + "] 님이 회원님의 그림에 공감했습니다.";
		}

		MessageDto fcmMessage = MessageDto.builder()
				.message(MessageDto.Message.builder().token(targetToken)
						.notification(MessageDto.Notification.builder().title(title).body(body).image(null).build())
						.build())
				.validate_only(false).build();

		return objectMapper.writeValueAsString(fcmMessage);
	}

	private String getAccessToken() throws IOException {
		String firebaseConfigPath = "ssafy8th-mindder-firebase-adminsdk-8rjd1-0f20b4e91c.json";

		GoogleCredentials googleCredentials = GoogleCredentials
				.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
				.createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));

		googleCredentials.refreshIfExpired();
		return googleCredentials.getAccessToken().getTokenValue();
	}
}
