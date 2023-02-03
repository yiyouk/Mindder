package com.ssafy.mindder.util;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

public class Base64Util {
	public String getBase64(File file) throws IOException {
		return Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(file));
	}
}
