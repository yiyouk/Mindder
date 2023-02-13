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
public class AlarmsUserDto {
	private String deviceToken;
	private String receiveUserNickname;
	private String senderUserNickname;
}
