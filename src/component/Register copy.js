import React, {useState} from 'react';
import axios from 'axios';

function Register() {
  //1. 변수선언
  const [form, setForm] = useState({
    username:'', //사용자 아이디
    password:'', //사용자 패스워드
    confirmPassword:'' //패스워드 확인
  });

  const [error, setError] = useState(''); //에러시 출력 변수
  const [success, setSuccess] = useState(''); //성공시 출력 변수

  //2. 사용자가 입력양식에 입력을 하면 실행되는 함수
  const handleChange = e =>{
    //id와 password를 입력하면 각각 변수에 담고
    setForm({...form, [e.target.name]:e.target.value});
    setError('');
    setSuccess('');
  };

  //3. 유효성 검사를 하여 모든 내용 서버로 전송하기
  const handleSubmit = async e =>{
    e.preventDefault();

    //비밀번호 확인하기   2개의 비밀번호가 일치하는지~
    if(form.password!==form.confirmPassword){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try{ //DB서버와 통신이 잘되면 POST방식으로 ID, PW를 넘긴다. 
      const res = await axios.post('http://localhost:9070/register',{
        username:form.username,
        password:form.password
      });
    }catch(err){ //실패시 아래 에러 출력
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
    }
  };



  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>  
        <p>
        <label for="username">아이디 : </label>
        <input type='text' id='username'
        name='username'
          placeholder='아이디'
          value={form.username}
          onChange={handleChange}
          required
        />
        </p>

        <p>
        <label>패스워드 : </label>
        <input type='password' id='password'
        name='password'
        placeholder='비밀번호'
        value={form.password}
        onChange={handleChange}
        required
        />
        </p>

                <p>
        <label>패스워드 확인 : </label>
        <input type='password' id='confirmPassword'
        name='confirmPassword'
        placeholder='비밀번호 확인'
        value={form.confirmPassword}
        onChange={handleChange}
        required
        />
        </p>

        <p><button type='submit'>회원가입</button></p>
        
        {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
        {error&&<p style={{color:'red'}}>{error}</p>}

        {/* 회원가입 성공이면 초록색으로 문자 출력 */}
        {success&&<p style={{color:'green'}}>{success}</p>}
      </form>
    </section>
  );
}

export default Register;