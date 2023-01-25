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
public class UsersDto {
	int userIdx;
	String socialId = null;
	String email;
	String password;
	String nickname;
	String refreshToken;
	boolean isDeleted;
	int emoteColor;
}
