package com.ssafy.mindder.comments.model;

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
public class CommentsDto {

	private int commentIdx;
	private int feedIdx;
	private int userIdx;
	private String text;
	private String updateDate;
	private boolean isDeleted;

}
