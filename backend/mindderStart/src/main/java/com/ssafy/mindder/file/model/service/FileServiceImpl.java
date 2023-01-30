package com.ssafy.mindder.file.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.mindder.file.model.FileDto;
import com.ssafy.mindder.file.model.mapper.FileMapper;

@Service
public class FileServiceImpl implements FileService{

	@Autowired
	FileMapper fileMapper;
	@Override
	public void addFile(FileDto fileDto) {
		fileMapper.addFile(fileDto);
	}
	@Override
	public FileDto findFile(int fileIdx) {
		// TODO Auto-generated method stub
		return fileMapper.findFile(fileIdx);
	}
	
}
