package com.ssafy.mindder.file.model.mapper;

import com.ssafy.mindder.file.model.FileDto;

public interface FileMapper {
	void addFile(FileDto fileDto);
	FileDto findFile(int fileIdx);
	
}
