package com.ssafy.mindder.common;

import static com.ssafy.mindder.common.StatusCode.SUCCESS;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

	/*
	 * 등록/생성: CREATE, 조회: READ, 수정: UPDATE, 삭제/취소: DELETE
	 */
	
	// alarms
	CREATE_PUSH_ALARMS(SUCCESS, "푸시 알림 전송 성공"),
	
	// file
	READ_FILE_IDX(SUCCESS, "파일idx 조회 성공"), READ_FILE_BEAR(SUCCESS, "곰돌이파일 조회 성공"),
	READ_FILE_BASE64(SUCCESS, "파일 Base64 조회 성공"),

	//searches
	READ_SEARCHES_USER(SUCCESS,"유저 검색 성공"),
	// password
	UPDATE_PASSWORD(SUCCESS, "비밀번호 변경 성공"),

	// feeds
	CREATE_MAIN_FEED(SUCCESS, "메인 피드 글 등록 성공"), UPDATE_MAIN_FEED(SUCCESS, "메인 피드 글 수정 성공"),
	DELETE_MAIN_FEED(SUCCESS, "메인 피드 글 삭제 성공"), READ_DETAIL_MAIN_FEED(SUCCESS, "메인 피드 글 상세보기 성공"),
	READ_NEIGHBORS_FEED_LIST(SUCCESS, "이웃 피드 글 보기 성공"), READ_FIND_BEAR(SUCCESS, "완성된 곰돌이 이미지 조회"),
	READ_IMAGE_CRAAWLING_COLOR(SUCCESS, "이미지 크롤링 성공"), READ_RECOMMENDATION_FEED(SUCCESS, "추천 리스트 불러오기 성공"),
	READ_POPULAR_FEED(SUCCESS, "주간 인기글 불러오기 성공"), READ_RECENT_FEED(SUCCESS, "실시간 작성된 피드 리스트 불러오기 성공"),

	// comment
	DELETE_COMMNET(SUCCESS, "메인 피드 댓글 삭제 성공"), CREATE_COMMENT(SUCCESS, "메인 피드 댓글 작성 성공"),
	READ_COMMENT_LIST(SUCCESS, "메인 피드 댓글 리스트 조회 성공"),

	// likes
	CREATE_LIKE(SUCCESS, "공감 등록 성공"), UPDATE_LIKE(SUCCESS, "공감 수정 성공"), DELETE_LIKE(SUCCESS, "공감 삭제 성공"),

	// my
	READ_MY_FEED_LIST(SUCCESS, "내가 쓴 피드 목록 조회 성공"), READ_OTHERS_FEED_LIST(SUCCESS, "타인이 쓴 피드 목록 조회 성공"),
	READ_MY_FOLLOWER_LIST(SUCCESS, "팔로워 목록 조회 성공"), READ_MY_FOLLOWING_LIST(SUCCESS, "팔로잉 목록 조회 성공"),
	READ_MY_CALENDAR_LIST(SUCCESS, "월별 캘린더 목록 조회 성공"), CREATE_MY_FOLLOW(SUCCESS, "팔로우 등록 성공"),
	DELETE_MY_FOLLOW(SUCCESS, "팔로우 취소 성공"), READ_MY_FEEDS_RECENT(SUCCESS, "최근 피드의 감정, 색 조회 성공"),

	// scraps
	CREATE_SCRAP(SUCCESS, "스크랩 등록 성공"), DELETE_SCRAP(SUCCESS, "스크랩 삭제 성공"),
	READ_MY_SCRAP_LIST(SUCCESS, "내 스크랩 목록 조회 성공"),
	
	// statistics
	READ_STATISTICS_LIST(SUCCESS, "통계 조회 성공"),

	// email
	READ_EMAIL_CONFIRM(SUCCESS, "인증 코드 발급 성공"), READ_TEMP_PASSWORD(SUCCESS, "임시 비밀번호 발급 성공"),

	// users
	CREATE_USER(SUCCESS, "유저 정보 등록 성공"), READ_CHECK_EMIAL(SUCCESS, "이메일 중복 확인 성공"), DELETE_USER(SUCCESS, "유저 정보 삭제 성공"),
	UPDATE_USER(SUCCESS, "유저 정보 수정 성공"), READ_KAKAO_LOGIN(SUCCESS, "카카오 유저 로그인 성공"), READ_LOGIN(SUCCESS, "유저 로그인 성공"),
	READ_LOGOUT(SUCCESS, "유저 로그아웃 성공"), READ_FIND_PWD(SUCCESS, "유저 비밀번호 일치 여부 확인 성공"),
	READ_CHECK_NICKNAME(SUCCESS, "유저 닉네임 중복 여부 확인 성공"), READ_CHECK_USER(SUCCESS, "회원 정보 조회 성공"),;

	private final StatusCode statusCode;
	private final String message;

	public int getStatus() {
		return statusCode.getStatus();
	}

}
