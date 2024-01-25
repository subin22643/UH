package org.project.uh.user.service;

import java.util.List;

import org.project.uh.user.dao.UserDao;
import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.ResultDto;
import org.project.uh.user.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService {

	private final UserDao dao;

	public UserServiceImpl(UserDao dao) {
		super();
		this.dao = dao;
	}

	// 회원 가입
	@Override
	public int insertUser(UserDto dto) {
		// 회원가입 시 userId 중복 체크
		if (dao.checkUserId(dto.getUserId()) > 0) {
			// 존재하는 userId, 회원가입 불가
			return 0;
		}
		// 중복 없으면 회원가입
		return dao.insertUser(dto);
	}

	// 아이디 중복 체크
	@Override
	public int idCheck(UserDto dto) {
		// 회원가입 시 userId 중복 체크
		if (dao.checkUserId(dto.getUserId()) > 0) {
			// 존재하는 userId, 회원가입 불가
			return 0;
		}
		// 중복 없으면 1
		return 1;
	}

	// 회원 목록 조회
	@Override
	public List<UserDto> listUser() {
		return dao.listUser();
	}


	// 로그인
	@Override
	public UserDto login(UserDto dto) {
		UserDto user = dao.login(dto);
		if (user == null) {
			return null;
		}
		return user;
	}

	@Override
	public int getUserId(UserDto dto) {
		return dao.getUserId(dto);
	}

	// 닉네임 생성
	@Override
	public int nickname(UserDto dto) {
		// 닉네임 중복 체크
		int nicknameCount = dao.checkUserNickname(dto.getUserNickname());
		if (nicknameCount > 0) {
			// 닉네임 중복일 때
			return 0;
		}
		// 중복 없으면 닉네임 생성
		return dao.nickname(dto);
	}

	@Override
	public int getUserNickname(UserDto dto) {
		return dao.getUserNickname(dto);
	}


	// 마이페이지
	@Override
	public MypageDto mypage(int userSeq) {
		return dao.mypage(userSeq);
	}


	// 전적 조회
	@Override
	public List<ResultDto> userRecord(int userSeq) {
		return dao.userRecord(userSeq);
	}

}