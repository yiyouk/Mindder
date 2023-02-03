package com.ssafy.mindder.feeds.model;

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
public class FeedsParameterDto {
	private int feedIdx;
	private String nickname;
	private String updateDate;
	private int commentCount;
	private int likeCount;
	private int cheerupCount;
	private int sadCount;
	private int likeTotalCount;
	private int fileIdx;
	private String base64;
	private String extension;
	private int userIdx;
	private int myLikeType; // 내가 누른 공감 버튼
}
