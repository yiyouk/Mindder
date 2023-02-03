package com.ssafy.mindder.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mindder.exception.UnAuthorizedException;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.JwtServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtInterceptor implements HandlerInterceptor {

public static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);
	
	private static final String HEADER_AUTH = "access_token";
	ObjectMapper objectMapper = new ObjectMapper();
	final private JwtService jwtService;
	public JwtInterceptor(){
		jwtService = new JwtServiceImpl();
	}
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		final String token = request.getHeader(HEADER_AUTH);
		if(token != null && jwtService.checkToken(token)){
			logger.info("토큰 사용 가능 : {}", token);
			return true;
		}else{
			logger.info("토큰 사용 불가능 : {}", token);
			response.setContentType("application/json");
	        response.setCharacterEncoding("utf-8");
	        Map<String, Object> temp = new HashMap<>();
	        temp.put("status", 401);
	        temp.put("success", false);
	        temp.put("message", "유효하지 않은 토큰입니다.");
	        
	        String result = objectMapper.writeValueAsString(temp);
	        response.getWriter().write(result);
		}
		return false;
	}
	
}

