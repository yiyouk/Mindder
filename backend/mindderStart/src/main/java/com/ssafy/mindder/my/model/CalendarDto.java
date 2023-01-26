package com.ssafy.mindder.my.model;

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
public class CalendarDto {
	
	private int calendarIdx;
	private String calendarDate;
	private int userIdx;
	private int emoteIdx;
	private int emoteColorIdx;
	
}
