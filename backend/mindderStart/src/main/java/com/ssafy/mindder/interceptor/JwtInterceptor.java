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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mindder.exception.UnAuthorizedException;
import com.ssafy.mindder.util.JwtService;
import com.ssafy.mindder.util.JwtServiceImpl;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
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
	private static final String ORIGIN = "Origin";
	private static final String AC_REQUEST_METHOD = "Access-Control-Request-Method";
	private static final String AC_REQUEST_HEADERS = "Access-Control-Request-Headers";

	private static final String AC_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
	private static final String AC_ALLOW_METHODS = "Access-Control-Allow-Methods";
	private static final String AC_ALLOW_HEADERS = "Access-Control-Allow-Headers";

	private CorsData corsData;

	private String origin;
	private String allowMethods;
	private String allowHeaders;

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public void setAllowMethods(String allowMethods) {
		this.allowMethods = allowMethods;
	}

	public void setAllowHeaders(String allowHeaders) {
		this.allowHeaders = allowHeaders;
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		this.corsData = new CorsData(request);

		if(this.corsData.isPreflighted()) {
			response.setHeader(AC_ALLOW_ORIGIN, origin);
			response.setHeader(AC_ALLOW_METHODS, allowMethods);
			response.setHeader(AC_ALLOW_HEADERS, allowHeaders);

			return false;
		}

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
	class CorsData {

		private String origin;
		private String requestMethods;
		private String requestHeaders;

		CorsData(HttpServletRequest request) {
			this.origin = request.getHeader(ORIGIN);
			this.requestMethods= request.getHeader(AC_REQUEST_METHOD);
			this.requestHeaders = request.getHeader(AC_REQUEST_HEADERS);
		}

		public boolean hasOrigin(){
			return origin != null && !origin.isEmpty();
		}

		public boolean hasRequestMethods(){
			return requestMethods != null && !requestMethods.isEmpty();
		}

		public boolean hasRequestHeaders(){
			return requestHeaders != null && !requestHeaders.isEmpty();
		}

		public String getOrigin() {
			return origin;
		}

		public String getRequestMethods() {
			return requestMethods;
		}

		public String getRequestHeaders() {
			return requestHeaders;
		}

		public boolean isPreflighted() {
			return hasOrigin() && hasRequestHeaders() && hasRequestMethods();
		}

		public boolean isSimple() {
			return hasOrigin() && !hasRequestHeaders();
		}
	}
}

