// src/component/Register.js

import React, { useState } from 'react';
import axios from 'axios';
// ★ useNavigate 추가
import { useNavigate } from 'react-router-dom';

function Register() {
  // 1) 상태 변수 선언
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ★ useNavigate 훅 호출
  const navigate = useNavigate();

  // 2) 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 시(CloudType) Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3) 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // 4) “회원가입” 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/register`, {
        username: form.username,
        password: form.password
      });

      if (res.data.success) {
        // ★ alert 창 뜨도록 변경
        alert('회원가입 완료! 이제 로그인 해주세요.');
        // ★ 로그인 페이지로 이동
        navigate('/login');

        // (선택) 입력 폼 초기화
        setForm({ username: '', password: '', confirmPassword: '' });
      }
    } catch {
      setError('회원가입 실패: 이미 존재하는 아이디이거나 서버 오류입니다.');
    }
  };

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="common_form login_form">
        <p>
          <label htmlFor="username">아이디 : </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="confirmPassword">패스워드 확인 : </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <button type="submit" className="reg_btn">회원가입</button>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </section>
  );
}

export default Register;
