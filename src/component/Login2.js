// src/component/Login2.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login2(props) {
  // 1. 상태 변수 선언
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 2. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포된 CloudType Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 4. 로그인 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/login2`, form);
      localStorage.setItem('token', res.data.token);   // 토큰 저장
      alert('로그인 성공');
      navigate('/');                                   // 홈으로 이동
    } catch (err) {
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.');
    }
  };

  return (
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="common_form login_form">
        <p>
          <label htmlFor="username">아이디 : </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="아이디를 입력하세요"
            value={form.username}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="패스워드 입력"
            value={form.password}
            onChange={handleChange}
            required
          />
        </p>
        <p><input type="submit" value="로그인" /></p>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p className="log_p_center">
          아이디 찾기 &#10072; 비번찾기 &#10072; <Link to="/register2">회원가입</Link>
        </p>

        <h3 style={{ textAlign: 'center' }}>간편가입</h3>
        <ul className="sns_login">
          <li>
            <a href="/auth/kakao" className="sns_btn">
              <img
                src={`${process.env.PUBLIC_URL}/images/kakao_log_btn_img.png`}
                alt="카카오 로그인"
              />
            </a>
          </li>
          <li>
            <a href="/auth/naver" className="sns_btn">
              <img
                src={`${process.env.PUBLIC_URL}/images/naver_log_btn_img.png`}
                alt="네이버 로그인"
              />
            </a>
          </li>
          <li>
            <a href="/auth/google" className="sns_btn">
              <img
                src={`${process.env.PUBLIC_URL}/images/google_log_btn_img.png`}
                alt="Google 로그인"
              />
            </a>
          </li>
        </ul>

        <h3>프론트엔드(React)에서 처리</h3>
        <ul>
          <li>로그인 폼 작성 후 회원가입 버튼 클릭 → 회원가입 화면으로 이동</li>
          <li>회원가입 시 “아이디(username), 패스워드(password), 전화번호(tel), 이메일(email)” 입력</li>
          <li>로그인 폼에 “아이디, 패스워드” 입력 후 로그인 버튼 클릭 → 서버로 인증 요청</li>
        </ul>

        <h3>백엔드(Node.js + Express)에서 처리</h3>
        <ul>
          <li>사용자가 입력한 id, pw를 POST 방식으로 받아서 DB 조회 → 일치 시 JWT 토큰 발급</li>
          <li>데이터베이스(MYSQL) : 사용자 정보를 저장</li>
          <li>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증 유지</li>
        </ul>

        <h3>용어 설명</h3>
        <ul>
          <li>express : 웹 서버 프레임워크</li>
          <li>cors : 크로스 도메인 요청 허용</li>
          <li>mysql : MySQL 연결 라이브러리</li>
          <li>bcrypt : 비밀번호 해시 처리 라이브러리</li>
          <li>jsonwebtoken : JWT 생성/검증 라이브러리</li>
          <li>express.json() : JSON 형식 요청 본문 파싱</li>
          <li>cors() : CORS 정책 허용</li>
          <li>bcrypt.compare : 입력 비밀번호와 DB 비밀번호 비교</li>
        </ul>

        <h3>DB 예시</h3>
        <pre><code>{`
          CREATE TABLE users2 (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            tel VARCHAR(255) NOT NULL,
            datetime TIMESTAMP NOT NULL DEFAULT current_timestamp()
          );
        `}</code></pre>
      </form>
    </section>
  );
}

export default Login2;
