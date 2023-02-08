package com.ssafy.mindder.feeds.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FeedsPageDto {
	private int startPage, endPage;
	private boolean prev, next;

	private int total;
	private Criteria cri;

	public FeedsPageDto(Criteria cri, int total) {
		this.cri = cri;
		this.total = total;

		this.endPage = (int) (Math.ceil(cri.getPageNum() / 10.0)) * 10;
		this.startPage = endPage - 9;
		this.prev = this.startPage > 1;

		// 71.0(71개의 글이 있을 경우) /10 => 7.1 이면 8버튼까지 있어야함
		int realEnd = (int) (Math.ceil((total * 1.0) / cri.getAmount()));
		// 따라서 8까지 버튼이 있어야함 -> 삼항연산자
		this.endPage = realEnd <= endPage ? realEnd : endPage;
		this.next = this.endPage < realEnd;

	}

}
