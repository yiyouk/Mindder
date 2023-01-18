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
	private int userIdx;
	private String updateDate;
	private boolean isPublic;
	private String mainText;
	private int emoteIdx;
	private int emoteColorIdx;
	private String normalTag;
	private int hit;
	private boolean isDeleted;
	
}
