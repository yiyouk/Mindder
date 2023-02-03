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

	private int feedIdx;
	private String feedComment;
	private String updateDate;
	private int userIdx;

}
