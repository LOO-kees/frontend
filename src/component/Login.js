// src/component/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';   // ← useNavigate 추가

function Login(props) {
  //   const [변수명,함수명] = useState('초기값');
  // }

  //1. 상태변수 선언
  const [form, setForm] = useState({
    username: '', //아이디를 저장하기 위한 변수
    password: ''  //패스워드를 저장하기 위한 변수
  });

  const [error, setError] = useState('');

  // ** 추가: 페이지 이동용 훅 **
  const navigate = useNavigate();

  //2. 입력시 발생되는 함수
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e => {
    e.preventDefault();
    // alert(form.username);
    //console.log(form.username, form.password)
    try { //성공시 실행내용
      // 'awit' 오타를 'await'로 수정했습니다.
      const res = await axios.post('http://localhost:9070/login', form);
      //사용자 인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공');

      // ** 성공 후 메인 페이지로 이동 **
      navigate('/');           // ← 이 한 줄이 핵심
    } catch(err) { //실패시 실행내용
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
        {error && <p style={{color:'red'}}>{error}</p>}
        <p className='log_p_center'>
          <Link to='/id_search'>아이디 찾기</Link>&#10072;
          <Link to='/pw_search'>비번찾기</Link>&#10072;
          <Link to='/register'>회원가입</Link>
        </p>

        {/*
        카카오 api 로그인
         */}

        <br />
        <br />

        <dl>
          <dt>* 로그인 구현 전체 구성</dt>
          <dt>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청</dt>
          <dt>2. 백엔드(Node.js + Express) : 로그인 처리, JWT 토큰 발급</dt>
          <dt>3. 데이터베이스(MYSQL) : DB입력 출력</dt>
          <dt>4. 보안 : 비밀번호는 brcypt로 암호화, JWT로 인증을 유지</dt>
        </dl>

        <pre><code>
          {`
          //1. 데이터베이스 테이블 설계 (예전에 만들었던 테이블:member, members)
              CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                datatime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
              );

            //2. 데이터베이스에 회원정보 입력하기(INSERT INTO)
              INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');
              INSERT INTO users VALUES(2, 'jeon1', '1234', '2025-05-26');
              INSERT INTO users VALUES(3, 'jeon2', '1234', '2025-05-26');
              INSERT INTO users VALUES(4, 'jeon3', '1234', '2025-05-26');
              INSERT INTO users VALUES(5, 'jeon4', '1234', '2025-05-26');


            //3. UI화면 설계 - 로그인폼 구현
          
          `}
        </code></pre>
      </form>
    </section>
  );
}

export default Login;
