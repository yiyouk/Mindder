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
public class FeedsRecentDto {

	private int emoteIdx;
	private int emoteColorIdx;
	private String emoteColorTag;
	private String updateDate;
	private int fileIdx;
	private String base64;
	private String extension;

}
