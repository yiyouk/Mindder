package com.ssafy.mindder.likes.model;

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
public class LikesDto {

	private int likeIdx;
	private int likeType;
	private int feedIdx;
	private int likeCount;
	private boolean isDeleted;

}
