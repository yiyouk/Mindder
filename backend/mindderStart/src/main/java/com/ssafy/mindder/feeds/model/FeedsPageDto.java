package com.ssafy.mindder.feeds.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FeedsPageDto {
	private int remain;
	private boolean next;

	private int total;
	private int pageNum;

	public FeedsPageDto(int pageNum, int total) {
		this.pageNum = pageNum;
		this.total = total;

		// 페이지 번호 반환
		int remain = (int) total - (pageNum * 10);
		if (remain < 0)
			remain = -1;

		if (0 <= remain) {
			this.next = true;
		}
		this.remain = remain;
	}
}
