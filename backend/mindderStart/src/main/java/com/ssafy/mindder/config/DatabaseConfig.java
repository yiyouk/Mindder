package com.ssafy.mindder.config;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(
		basePackages = "com.ssafy.mindder.*.model.mapper"
)
public class DatabaseConfig {}
