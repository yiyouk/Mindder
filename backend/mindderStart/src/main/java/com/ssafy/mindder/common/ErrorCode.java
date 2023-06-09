package com.ssafy.mindder.common;

import static com.ssafy.mindder.common.StatusCode.BAD_REQUEST;
import static com.ssafy.mindder.common.StatusCode.INTERNAL_SERVER;
import static com.ssafy.mindder.common.StatusCode.NOT_FOUND;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

	// 400 Bad Request
	VALIDATION_EXCEPTION(BAD_REQUEST, "잘못된 요청입니다."), VALIDATION_LIKE_EXCEPTION(BAD_REQUEST, "이미 해당 피드에 공감을 눌렀습니다."),
	VALIDATION_LIKE_TYPE_EXCEPTION(BAD_REQUEST, "likeType은 1, 2, 3만 가능합니다."),
	VALIDATION_SCRAP_EXCEPTION(BAD_REQUEST, "이미 등록된 스크랩입니다."),
	VALIDATION_FOLLOW_EXCEPTION(BAD_REQUEST, "이미 등록된 팔로우입니다."),
	VALIDATION_FILEIDX_EXCEPTION(BAD_REQUEST, "유효하지 않은 fileIdx입니다."),

	// 404 NOT FOUND
	NOT_FOUND_FEED_EXCEPTION(NOT_FOUND, "존재하지 않는 피드입니다."), NOT_FOUND_USER_EXCEPTION(NOT_FOUND, "존재하지 않는 유저입니다."),
	NOT_FOUND_LIKE_EXCEPTION(NOT_FOUND, "공감을 먼저 등록해주세요."), NOT_FOUND_SCRAP_EXCEPTION(NOT_FOUND, "존재하지 않는 스크랩입니다."),
	NOT_FOUND_FOLLOW_EXCEPTION(NOT_FOUND, "존재하지 않는 팔로우입니다."), NOT_FOUND_ALARM_EXCEPTION(NOT_FOUND, "존재하지 않는 알림입니다. alarmIdx를 확인해주세요."),

	// 500 Internal Server Exception
	INTERNAL_SERVER_EXCEPTION(INTERNAL_SERVER, "예상치 못한 서버 에러가 발생하였습니다.")
	,NOT_TOKEN(INTERNAL_SERVER,"토큰 없음");

	private final StatusCode statusCode;
	private final String message;

	public int getStatus() {
		return statusCode.getStatus();
	}

}
