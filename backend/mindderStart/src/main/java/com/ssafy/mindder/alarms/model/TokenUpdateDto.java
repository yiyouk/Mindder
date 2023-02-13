package com.ssafy.mindder.alarms.model;

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
public class TokenUpdateDto {
	private int userIdx;
	private String deviceToken;
}
