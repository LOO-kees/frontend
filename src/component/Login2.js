import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login2(props) {
  
    // 1. 상태변수
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 2. 입력 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. 로그인 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9070/login2', form);
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
            required     // ← 필수 입력
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
        
        <h3 style={{textAlign:'center'}}>간편가입</h3>
           {/* 간편 로그인 버튼 */}
          <ul className="sns_login">
            <li>
              <a href="/auth/kakao" className="sns_btn">
                <img src={`${process.env.PUBLIC_URL}/images/kakao_log_btn_img.png`} alt="카카오 로그인" />
              </a>
            </li>
            <li>
              <a href="/auth/naver" className="sns_btn">
                <img src={`${process.env.PUBLIC_URL}/images/naver_log_btn_img.png`} alt="네이버 로그인" />
              </a>
            </li>
            <li>
              <a href="/auth/google" className="sns_btn">
                <img src={`${process.env.PUBLIC_URL}/images/google_log_btn_img.png`} alt="Google 로그인" />
              </a>
            </li>
          </ul>
      </form>

      <p>카카오 로그인 버튼 url : https://developers.kakao.com/tool/resource/login</p>
      <p>네이버 로그인 버튼 url : https://developers.naver.com/docs/login/bi/bi.md</p>



      <h3>프론트엔드(React)에서 처리</h3>
      <ul>
        <li>로그인폼을 작성하고 '회원가입'클릭하면 회원가입 페이지로 이동하기</li>
        <li>회원가입시 '아이디(username)', '비밀번호(password)', '전화번호(tel)', '이메일(email)'를 입력하여 회원가입을 할 수 있도록 한다.</li>
        <li>사용자가 '아이디', '패스워드'를 입력하여 '로그인'버튼 클릭시 서버측에 '인증 요청'</li>
      </ul>

      <h3>백엔드(Node.js + Express)에서 처리</h3>
      <ul>
        <li>사용자가 입력한 id, pw를 post방식으로 받아 db조회하여 일치하는지 여부에 따라 로그인 처리를 하고 JWT토큰을 발급함</li>
        <li>데이터베이스(MYSQL) : 사용자 정보를 저장</li>
        <li>보안 : 비밀번호는 bcrypt로 암호화, JWT로 인증을 유지함</li>
        </ul>

        <h3>용어 설명</h3>
        <ul>
          <li>express : 웹 서버 프레임워크</li>
          <li>cors : 크로스 도메인 요청을 허용</li>
          <li>mysql : MySQL 데이터베이스 연결을 위한 라이브러리(npm i mysql)</li>
          <li>bcrypt : 사용자가 입력한 패스워드를 해시 처리 (npm i bcrypt)</li>
          <li>jsonwebtoken : JWT 토큰 생성 및 검증 (npm i jsonwebtoken)</li>
          <li>app : Express 앱 객체 생성</li>
          <li>post : 서버가 열릴 포트 번호(통화하기 위한 상대방 전화번호와 같다.)</li>
          <li>SECRET_KEY : JWT 서명 시 사용할 비밀 키</li>
          <li>express.json() : JSON 형식의 요청 본문을 피싱</li>
          <li>cors() : CORS 정책 허용</li>
          <li>bcrypt.compare : 입력한 비밀번호와 DB비밀번호 비교할 때</li>
        </ul>

        <h3>DB에 입력할 SQL쿼리문</h3>
        <pre><code>{`
          CREATE TABLE users2 (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            tel VARCHAR(255) NOT NULL,
            datetime timestamp NOT NULL DEFAULT current_timestamp() 
          );
          
        
        `}</code></pre>
    </section>
  );
}

export default Login2;