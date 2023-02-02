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
public class FeedsRecommendationDto {
	private int feedIdx;
	private int fileIdx;
	private int userIdx;
	private int commentCount;
	private int likeTotalCount;
}
