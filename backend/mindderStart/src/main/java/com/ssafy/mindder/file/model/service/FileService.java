package com.ssafy.mindder.file.model.service;

import com.ssafy.mindder.file.model.FileDto;

public interface FileService {
	void addFile(FileDto fileDto);
	FileDto findFile(int fileIdx);
}

