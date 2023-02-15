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
	
	private int userIdx;
	private String email;
	private String nickname;
	private int fileIdx;
	private int emoteColorIdx;
	private String socialId = null;
	private int followerCount;
	private int followingCount;
	private boolean followed;
	private int alarmCount;
	private String base64;
	private String extension;
	
}
