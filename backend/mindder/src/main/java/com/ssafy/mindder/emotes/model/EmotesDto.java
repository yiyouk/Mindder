package com.ssafy.mindder.emotes.model;

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
// 완성된 감정 Dto
public class EmotesDto {

	private int emoteCompleteIdx;
	private int emoteIdx;
	private int emoteColorIdx;
	private String emoteCompleteUrl;
	
}
