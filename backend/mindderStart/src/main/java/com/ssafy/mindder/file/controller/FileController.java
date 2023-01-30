package com.ssafy.mindder.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.mindder.file.model.FileDto;
import com.ssafy.mindder.file.model.service.FileService;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileService fileService;
	@PostMapping
	public String fileUpLoad(@Value("${file.path.upload-files}") String filePath,
			@RequestParam("upfile") MultipartFile[] files) throws Exception {
		System.out.println(filePath);
		if (!files[0].isEmpty()) {
			String today = new SimpleDateFormat("yyMMdd").format(new Date());
			String saveFolder = filePath + File.separator + today;
			File folder = new File(saveFolder);
			if (!folder.exists())
				folder.mkdirs();
			for (MultipartFile mfile : files) {
				FileDto fileInfoDto = new FileDto();
				String originalFileName = mfile.getOriginalFilename();
				if (!originalFileName.isEmpty()) {
					String saveFileName = System.nanoTime()
							+ originalFileName.substring(originalFileName.lastIndexOf('.'));
					fileInfoDto.setSaveFolder(today);
					fileInfoDto.setOriginalFile(originalFileName);
					fileInfoDto.setSaveFile(saveFileName);
					mfile.transferTo(new File(folder, saveFileName));
				}
				fileService.addFile(fileInfoDto);
			}
		}
		return "!";
	}

	@GetMapping("/{fileIdx}")
	public ResponseEntity<byte[]> getFile(@Value("${file.path.upload-files}") String filePath,@PathVariable("fileIdx") int fileIdx) {
		FileDto temp = fileService.findFile(fileIdx);
		String saveFolder = temp.getSaveFolder(); // 파일 경로
		String originalFile = temp.getOriginalFile(); // 원본 파일명(화면에 표시될 파일 이름)
		String saveFile = temp.getSaveFile(); // 암호화된 파일명(실제 저장된 파일 이름)
		File file = new File(filePath + File.separator + saveFolder, saveFile);
		ResponseEntity<byte[]> result = null;
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", Files.probeContentType(file.toPath()));
			result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), headers, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
}
