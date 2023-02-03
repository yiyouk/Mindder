package com.ssafy.mindder.email.model;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.sql.Date;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@PropertySource("classpath:application.properties")
@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

	private final JavaMailSender javaMailSender;

	// 인증번호 생성
	private final String code = createKey();
	// 임시 비밀번호 생성
	private final String tmpPw = createTempPassword();

	@Value("${spring.mail.username}")
	private String id;

	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
		log.info("보내는 대상 : " + to);
		log.info("인증 번호 : " + code);
		MimeMessage message = javaMailSender.createMimeMessage();

		message.addRecipients(MimeMessage.RecipientType.TO, to); // to 보내는 대상
		message.setSubject("[마인더] 회원가입 인증번호 안내 "); // 메일 제목

		// 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
		String msg = "";
		msg += "<h2 style=\"font-size: 20px; color: #7767FD; padding-right: 30px; padding-left: 30px;\">인증 번호 확인 후</h2>";
		msg += "<h2 style=\"font-size: 20px; color: #7767FD; padding-right: 30px; padding-left: 30px;\">이메일 인증을 완료해 주세요.</h2>";
		msg += "<p style=\"font-size: 15px; padding-right: 30px; padding-left: 30px;\">아래 인증 번호를 회원가입 화면에서 입력해 주세요.</p>";
		msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 10px 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #C4BFFA; height: 50px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 20px;\">";
		msg += code;
		msg += "</td></tr></tbody></table></div>";

		message.setText(msg, "utf-8", "html"); // 내용, charset타입, subtype
		message.setFrom(new InternetAddress(id, "Mindder_Admin")); // 보내는 사람의 메일 주소, 보내는 사람 이름

		return message;
	}
	
	public MimeMessage createPwMessage(String to) throws MessagingException, UnsupportedEncodingException {
		log.info("보내는 대상 : " + to);
		log.info("임시 비밀번호 : " + tmpPw);
		MimeMessage message = javaMailSender.createMimeMessage();

		message.addRecipients(MimeMessage.RecipientType.TO, to); // to 보내는 대상
		message.setSubject("[마인더] 임시 비밀번호 안내 "); // 메일 제목

		// 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
		String msg = "";
		msg += "<h2 style=\"font-size: 20px; color: #7767FD; padding-right: 30px; padding-left: 30px;\">임시 비밀번호 안내드립니다.</h2>";
		msg += "<p style=\"font-size: 15px; padding-right: 30px; padding-left: 30px;\">아래 임시 비밀번호로 로그인 후 [마이페이지>회원정보>비밀번호 변경]에서 비밀번호 재설정이 가능합니다.</p>";
		msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 10px 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #C4BFFA; height: 50px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 20px;\">";
		msg += tmpPw;
		msg += "</td></tr></tbody></table></div>";

		message.setText(msg, "utf-8", "html"); // 내용, charset타입, subtype
		message.setFrom(new InternetAddress(id, "Mindder_Admin")); // 보내는 사람의 메일 주소, 보내는 사람 이름

		return message;
	}

	// 인증코드 만들기
	public static String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 6; i++) { // 인증코드 6자리
			key.append((rnd.nextInt(15)));
		}
		return key.toString();
	}

	// 임시 비밀번호 만들기
	public static String createTempPassword() {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
				'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
				'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&' };

		StringBuffer sb = new StringBuffer();
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date(15).getTime());

		int idx = 0;
		int len = charSet.length;
		for (int i = 0; i < 15; i++) {
			idx = sr.nextInt(len);
			sb.append(charSet[idx]);
		}

		return sb.toString();
	}

	/*
	 * 메일 발송 sendSimpleMessage의 매개변수로 들어온 to는 인증번호를 받을 메일주소 MimeMessage 객체 안에 내가 전송할
	 * 메일의 내용을 담아준다. bean으로 등록해둔 javaMailSender 객체를 사용하여 이메일 send
	 */
	// 인증 코드
	public String sendSimpleMessage(String to) throws Exception {
		MimeMessage message = createMessage(to);
		try {
			javaMailSender.send(message); // 메일 발송
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}
		return code; // 메일로 보냈던 인증 코드를 서버로 리턴
	}
	
	// 임시 비밀번호
	public String sendSimplePwMessage(String to) throws Exception {
		MimeMessage message = createPwMessage(to);
		try {
			javaMailSender.send(message); 
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}
		return tmpPw; 
	}
}
