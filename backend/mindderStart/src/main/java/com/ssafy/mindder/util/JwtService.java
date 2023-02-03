package com.ssafy.mindder.util;

import java.util.Map;

public interface JwtService {
	<T> String createAccessToken(String key, T data);

	<T> String createRefreshToken(String key, T data);

	<T> String create(String key, T data, String subject, long expir);

	Map<String, Object> get(String key);

	boolean checkToken(String jwt);

	int getUserIdx(String token);

	int neighborFeed(String accessToken);

	int similarColorFeed(String accessToken);

}
