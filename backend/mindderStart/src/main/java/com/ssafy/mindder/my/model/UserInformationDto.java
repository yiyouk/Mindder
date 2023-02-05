package com.ssafy.mindder.my.model;

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
public class UserInformationDto {
	
	int userIdx;
	String email;
	String nickname;
	int fileIdx;
	int emoteColorIdx;
	String socialId = null;
	int followerCount;
	int followingCount;
	String base64;
	String extension;
	
}
