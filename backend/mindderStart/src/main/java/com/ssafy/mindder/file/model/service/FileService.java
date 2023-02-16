package com.ssafy.mindder.file.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.mindder.file.model.FileDto;

public interface FileService {
	List<FileDto> findNormalBear(Map<String, Integer> map) throws Exception;
	int addFile(FileDto fileDto) throws Exception;
	Map<String, String> findFile(int fileIdx, String filePath) throws Exception;
	Map<String, String> findCompleteBear(Map<String, Integer> map, String filePath) throws Exception;
}

