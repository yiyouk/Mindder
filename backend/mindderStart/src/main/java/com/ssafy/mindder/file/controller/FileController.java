package com.ssafy.mindder.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.mindder.common.ErrorCode;
import com.ssafy.mindder.common.SuccessCode;
import com.ssafy.mindder.common.dto.ApiResponse;
import com.ssafy.mindder.file.model.FileDto;
import com.ssafy.mindder.file.model.service.FileService;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileService fileService;

	@Value("${file.path.upload-files}") 
	String filePath;

	@PostMapping
	public ApiResponse<?> fileUpLoad(@RequestBody FileDto fileDto) throws Exception {
		int fileIdx =0;
		if (fileDto.getBase64()!=null||!fileDto.getBase64().equals("")) {
			String today = new SimpleDateFormat("yyMMdd").format(new Date());
			String saveFolder = filePath + today;

			File folder = new File(saveFolder);
			if (!folder.exists())
				folder.mkdirs();
			String saveFileName = System.nanoTime()
					+ fileDto.getOriginalFile().substring(fileDto.getOriginalFile().lastIndexOf('.'));
			File file = new File(saveFolder+ File.separator+saveFileName);
			byte[] decode = Base64.getDecoder().decode(fileDto.getBase64());
			FileOutputStream fileOutputStream = new FileOutputStream(file);
		    fileOutputStream.write(decode);
		    fileOutputStream.close();
		    fileDto.setSaveFile(saveFileName);
		    fileDto.setSaveFolder(today);
			fileIdx= fileService.addFile(fileDto);
		}
		return ApiResponse.success(SuccessCode.READ_FILE_IDX, fileIdx);

	}

	@GetMapping("/{fileIdx}")
	public ApiResponse<?> getFile(@PathVariable("fileIdx") int fileIdx) {
		Map<String, String> tp = null;
		try {
			tp = fileService.findFile(fileIdx, filePath);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ApiResponse.success(SuccessCode.READ_FILE_BASE64, tp);
		// return new ResponseEntity<String>(file.toPath().toString(), HttpStatus.OK);
	}

	@GetMapping("/test/{fileIdx}")
	public ResponseEntity<?> testFile(@PathVariable("fileIdx") int fileIdx) throws Exception {
			FileDto temp = fileService.testfile(fileIdx);
			String saveFolder = temp.getSaveFolder(); // 파일 경로
			String originalFile = temp.getOriginalFile(); // 원본 파일명(화면에 표시될 파일 이름)
			String saveFile = temp.getSaveFile(); // 암호화된 파일명(실제 저장된 파일 이름)
			File file = new File(filePath + saveFolder, saveFile);
			ResponseEntity<String> result = null;
			try {
				HttpHeaders headers = new HttpHeaders();
				headers.add("Content-Type", Files.probeContentType(file.toPath()));
				result = new ResponseEntity<String>(Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(file)), headers, HttpStatus.OK);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return result;
			//return new ResponseEntity<String>(file.toPath().toString(), HttpStatus.OK);
		}
	}
	@GetMapping("/normal-bear")
	public ApiResponse<?> normalBear() {
		Map<String, Integer> map = new HashMap<>();
		List<String> re = new ArrayList<>();
		map.put("s", 5);
		map.put("e", 20);
		try {
			List<FileDto> lf = fileService.findNormalBear(map);
			System.out.println(lf);
			for (FileDto temp : lf) {
				String saveFolder = temp.getSaveFolder(); // 파일 경로
				String originalFile = temp.getOriginalFile(); // 원본 파일명(화면에 표시될 파일 이름)
				String saveFile = temp.getSaveFile(); // 암호화된 파일명(실제 저장된 파일 이름)
				File file = new File(filePath + saveFolder, saveFile);
				re.add(Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(file)));
			}
			return ApiResponse.success(SuccessCode.READ_FILE_BEAR, re);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
