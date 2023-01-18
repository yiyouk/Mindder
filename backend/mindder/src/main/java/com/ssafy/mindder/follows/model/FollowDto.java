package com.ssafy.mindder.follows.model;

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
public class FollowDto {

	private int followIdx;
	private int userIdx;
	private int targetUserIdx;
	private boolean isDeleted;

}
