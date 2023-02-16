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
public class AlarmListDto {
	private int alarmIdx;
	private int alarmType;
	private int sendUserIdx;
	private String nickname;
	private String updateDate;
	private int feedIdx;
	private int likeType;
	private boolean read;
	private int fileIdx;
	private String base64;
	private String extension;
	private int feedFileIdx;
	private String feedBase64;
	private String feedExtension;
}
