package com.ssafy.mindder.users.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
	int userIdx;
	String nickname;
	String accessToken;
	boolean pushAlarmAgree;
}
