package com.ssafy.mindder.feeds.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmoteListDto {

	private int emoteIdx;
	private int fileIdx;
	private String base64;
	private String extension;
}
