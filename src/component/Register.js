// src/component/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  // 1. 상태 변수 선언
  const [form, setForm] = useState({
    username: '',       // 사용자 아이디
    password: '',       // 사용자 비밀번호
    confirmPassword: '' // 비밀번호 확인
  });
  const [error, setError] = useState('');   // 에러 메시지
  const [success, setSuccess] = useState(''); // 성공 메시지

  // 2. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포된 CloudType Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // 4. 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // axios.post 시 BACKEND_URL로 변경
      const res = await axios.post(`${BACKEND_URL}/register`, {
        username: form.username,
        password: form.password
      });

      // 성공 응답 처리
      if (res.data.success) {
        setSuccess('회원가입이 완료되었습니다. 로그인 해주세요.');
        // 입력값 초기화
        setForm({ username: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
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
