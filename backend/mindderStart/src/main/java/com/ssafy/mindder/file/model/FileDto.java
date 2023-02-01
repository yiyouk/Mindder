package com.ssafy.mindder.file.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FileDto {
	private int fileIdx;
	private String saveFolder;
	private String originalFile;
	private String saveFile;
}
