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
public class FollowsDto {

	private int followIdx;
	private int userIdx;
	private String nickname;
	private int targetUserIdx;
	private boolean followed;
	private int fileIdx;
	private String base64;
	private String extension;

}
