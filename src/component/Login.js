// src/component/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';   // useNavigate 추가

function Login(props) {
  // 1. 상태 변수 선언
  const [form, setForm] = useState({
    username: '', // 아이디
    password: ''  // 비밀번호
  });
  const [error, setError] = useState('');

  // **페이지 이동용 훅**
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
      // axios 요청 시 백엔드 URL을 BACKEND_URL로 변경
      const res = await axios.post(`${BACKEND_URL}/login`, form);
      // 인증이 끝나면 토큰 발급
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');
      // 로그인 성공 후 메인 페이지(혹은 원하는 경로)로 이동
      navigate('/');
    } catch (err) {
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.');
    }
  };

  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit} className="common_form login_form">
        <p>
          <label htmlFor="username">아이디 : </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            placeholder="아이디"
            required
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            placeholder="패스워드"
            required
            onChange={handleChange}
          />
        </p>
        <p>
          <input type="submit" value="로그인" />
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className="log_p_center">
          <Link to="/id_search">아이디 찾기</Link>&#10072;
          <Link to="/pw_search">비번찾기</Link>&#10072;
          <Link to="/register">회원가입</Link>
        </p>

        <br /><br />
        <dl>
          <dt>* 로그인 구현 전체 구성</dt>
          <dt>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭 시 서버에 인증 요청</dt>
          <dt>2. 백엔드(Node.js + Express) : 로그인 처리, JWT 토큰 발급</dt>
          <dt>3. 데이터베이스(MYSQL) : DB입력 출력</dt>
          <dt>4. 보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지</dt>
        </dl>
        <pre><code>
          {`
          // 예시 DB 테이블 설계
          CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );

          // 예시 INSERT
          INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');
          ` }
        </code></pre>
      </form>
    </section>
  );
}

export default Login;
