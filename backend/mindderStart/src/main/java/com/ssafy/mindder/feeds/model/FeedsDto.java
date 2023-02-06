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
public class FeedsDto {

	private int feedIdx;
	private String socialId;
	private String updateDate;
	private String updateTime;
	private boolean isPublic;
	private String mainText;
	private String normalTag;
	private boolean isDeleted;
	private int userIdx;
	private int emoteIdx;
	private int emoteColorIdx;
	private int feedHit;
	private int fileIdx;
}
