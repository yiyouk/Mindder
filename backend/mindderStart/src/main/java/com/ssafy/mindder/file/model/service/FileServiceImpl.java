package com.ssafy.mindder.file.model.service;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
	public String findFile(int fileIdx, String filePath) throws Exception {
		// TODO Auto-generated method stub
		FileDto temp =fileMapper.findFile(fileIdx);
		String saveFolder = temp.getSaveFolder(); // 파일 경로
		String originalFile = temp.getOriginalFile(); // 원본 파일명(화면에 표시될 파일 이름)
		String saveFile = temp.getSaveFile(); // 암호화된 파일명(실제 저장된 파일 이름)
		File file = new File(filePath + saveFolder, saveFile);
		return Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(file));
	}
	@Override
	public List<FileDto> findNormalBear(Map<String, Integer> map) throws Exception {
		return fileMapper.findNormalBear(map);
	}
	
}
