package com.ssafy.mindder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.mindder.config.FileUploadProperties;

@EnableConfigurationProperties(
        {FileUploadProperties.class}
)
@SpringBootApplication
public class MindderApplication {

	public static void main(String[] args) {
		SpringApplication.run(MindderApplication.class, args);
	}
}
