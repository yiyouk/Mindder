package com.ssafy.mindder.feeds.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class FeedListDto {

	// 페이징 처리를 위함
	@ApiModelProperty(value = "현재 페이지 번호")
	private int pg;
	@ApiModelProperty(value = "페이지당 글갯수")
	private int spp;
	@ApiModelProperty(value = "페이지의 시작 글번호")
	private int start;

	public FeedListDto() {
		pg = 1;
		spp = 20;
	}

	public void setPg(int pg) {
		pg = pg == 0 ? 1 : pg;
		this.pg = pg;
	}

	private int feedIdx;
	private int fileIdx;
	private int userIdx;
	private String nickname;
	private int commentCount;
	private int likeTotalCount;
	private String base64;
	private String extension;
}
