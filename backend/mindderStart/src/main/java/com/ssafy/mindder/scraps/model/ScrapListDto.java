package com.ssafy.mindder.scraps.model;

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
public class ScrapListDto {

	private int feedIdx;
	private int fileIdx;
	private int userIdx;
	private String nickname;
	private int userProfileIdx;
	private String updateDate;
	private int commentCount;
	private int likeTotalCount;
	private String userBase64;
	private String userExtension;
	private String base64;
	private String extension;
}
