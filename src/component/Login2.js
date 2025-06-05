// src/component/Login2.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login2(props) {
  // 1) 상태 변수 선언
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 2) 백엔드 Public URL 설정
  // 개발 시 로컬 테스트하려면 아래 주석을 해제:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 시(CloudType)에는 Public URL을 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3) 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // 4) “로그인” 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 반드시 BACKEND_URL을 붙여주세요!
      const res = await axios.post(`${BACKEND_URL}/login2`, form);
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');
      navigate('/'); // 로그인 후 메인 페이지로 이동
    } catch (err) {
      setError('로그인 실패: 아이디와 비밀번호를 다시 확인하세요.');
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
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input type="submit" value="로그인" />
        </p>
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

        {/* 아래 설명 블록은 빌드에는 영향 주지 않지만, 혹시라도 잘못 닫힌 태그나 오타가 없는지 확인하세요 */}
        <h3>프론트엔드 설명</h3>
        <ul>
          <li>로그인 폼에 아이디/패스워드 입력 → “로그인” 누르면 POST /login2 호출</li>
          <li>성공 시 JWT 토큰을 localStorage에 저장</li>
        </ul>

        <h3>백엔드 설명</h3>
        <ul>
          <li>app.post('/login2', …) 라우터에서 DB 조회 후 bcrypt 검증 → 일치하면 JWT 발급</li>
        </ul>
      </form>
    </section>
  );
}

export default Login2;
