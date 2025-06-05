// src/component/Register2.js
import React, { useState } from 'react';
import axios from 'axios';

function Register2(props) {
  // 1. 상태 변수 선언
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    tel: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 2. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포된 CloudType Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
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
      const res = await axios.post(`${BACKEND_URL}/register2`, {
        username: form.username,
        password: form.password,
        email: form.email,
        tel: form.tel
      });

      if (res.data.success) {
        setSuccess('회원가입이 완료되었습니다. 로그인 해주세요.');
        // 제출 후 폼 초기화
        setForm({
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          tel: ''
        });
      }
    } catch (err) {
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
    }
  };

  // 5. 리셋 핸들러 (양식 초기화)
  const handleReset = (e) => {
    e.preventDefault();
    setForm({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      tel: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <>
      <section>
        <h2>회원가입</h2>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="common_form login_form"
        >
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
          <p>
            <label htmlFor="confirmPassword">패스워드 확인 : </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="패스워드 확인"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="tel">연락처 : </label>
            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder="000-0000-0000"
              value={form.tel}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="email">이메일 주소 : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="id@naver.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input className="reg_btn" type="submit" value="회원가입" />
            <input className="reset_btn" type="reset" value="가입취소" />
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </section>
    </>
  );
}

export default Register2;
