package com.ssafy.mindder.file.model.mapper;

import java.util.List;
import java.util.Map;

import com.ssafy.mindder.file.model.FileDto;

public interface FileMapper {
	List<FileDto> findNormalBear(Map<String, Integer> map) throws Exception;
	FileDto findCompleteBear(Map<String, Integer> map) throws Exception;
	int addFile(FileDto fileDto)throws Exception;
	FileDto findFile(int fileIdx)throws Exception;
	
	
}
