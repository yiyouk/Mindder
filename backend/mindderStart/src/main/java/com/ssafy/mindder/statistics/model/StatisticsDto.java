package com.ssafy.mindder.statistics.model;

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
public class StatisticsDto {

	private int emoteIdx;
	private String emoteColorTag;
	private String updateDate;
	private int fileIdx;
	private String base64;
	private String extension;

}
