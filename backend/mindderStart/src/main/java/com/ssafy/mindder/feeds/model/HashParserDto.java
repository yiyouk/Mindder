package com.ssafy.mindder.feeds.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HashParserDto {

	private int feedIdx;
	private int hashIdx;
	private String hash;
	private String find_tag;
}
