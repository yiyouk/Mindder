package com.ssafy.mindder.file.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.file.model.FileDto;
import com.ssafy.mindder.file.model.mapper.FileMapper;

@Service
public class FileServiceImpl implements FileService{

	@Autowired
	FileMapper fileMapper;
	@Override
	public int addFile(FileDto fileDto) throws Exception {
		fileMapper.addFile(fileDto);
		return fileDto.getFileIdx();
	}
	@Override
	public FileDto findFile(int fileIdx) throws Exception {
		// TODO Auto-generated method stub
		return fileMapper.findFile(fileIdx);
	}
	@Override
	public List<FileDto> findNormalBear(Map<String, Integer> map) throws Exception {
		return fileMapper.findNormalBear(map);
	}
	
}
