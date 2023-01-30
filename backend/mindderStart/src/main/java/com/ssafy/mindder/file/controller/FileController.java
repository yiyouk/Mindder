package com.ssafy.mindder.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Files;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.mindder.file.model.FileDto;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/file")
public class FileController {

	@PostMapping
	public String fileUpLoad(@Value("${file.path.upload-files}") String filePath,
			@RequestParam("upfile") MultipartFile[] files) throws Exception {
		System.out.println(filePath);
		if (!files[0].isEmpty()) {
			// String realPath = servletContext.getRealPath("/upload");
//			String realPath = servletContext.getRealPath("/resources/img");
			String today = new SimpleDateFormat("yyMMdd").format(new Date());
			String saveFolder = filePath + File.separator + today;
			File folder = new File(saveFolder);
			if (!folder.exists())
				folder.mkdirs();
			List<FileDto> fileInfos = new ArrayList<FileDto>();
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
				fileInfos.add(fileInfoDto);
			}
		}
		return "!";
	}

	@GetMapping
//	public @ResponseBody byte[]  fileDownLoad(@Value("${file.path.upload-files}") String filePath) {
//        System.out.println(1);
//		String saveFolder = "230130";	// 파일 경로
//        String originalFile ="temp";	// 원본 파일명(화면에 표시될 파일 이름)
//        String saveFile = "888854090619500.png";    	// 암호화된 파일명(실제 저장된 파일 이름)
//        File file = new File(filePath + File.separator  + saveFolder, saveFile);
//        InputStream in = getClass().getResourceAsStream(filePath + "/"  + saveFolder+"/"+saveFile);
//        return IOUtils.toByteArray(in);
	public ResponseEntity<byte[]> getFile(@Value("${file.path.upload-files}") String filePath) {
		String saveFolder = "230130"; // 파일 경로
		String originalFile = "temp"; // 원본 파일명(화면에 표시될 파일 이름)
		String saveFile = "888854090619500.png"; // 암호화된 파일명(실제 저장된 파일 이름)
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
