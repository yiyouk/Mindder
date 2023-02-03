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
public class FeedListDto {
	private int feedIdx;
	private int fileIdx;
	private int userIdx;
	private String nickname;
	private String updateDate;
	private int commentCount;
	private int likeTotalCount;
}
