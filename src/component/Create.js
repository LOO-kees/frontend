import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Create= () => {
  const initialForm = { g_name: '', g_cost: '' };
  const [form, setForm] = useState(initialForm);

  //2) 환경에 따라 쓰실 백엔드 주소를 정의
  //   (1) 로컬 개발 시: http://localhost:9070
  //   (2) 배포된 상태: CloudType Public URL
  //    → 아래 두 줄 중 하나를 활성화하세요.
  
  // const BACKEND_URL = 'http://localhost:9070';  // 로컬 개발 테스트용
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';  // CloudType 배포용

  //url주소관리
  const navigate = useNavigate();

  //사용자가 입력박스에 입력하면 함수 호출
  const handleChange = (e) => {
    setForm({
      ...form, //기존 배열 값에 추가하여 저장
      [e.target.name]: e.target.value
    });
  };

  //신규 상품 등록하기 버튼 클릭시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침 막기

    axios.post(`${BACKEND_URL}/goods`, form)
      .then(() => { //서버와 통신이 성공하면
        alert('상품 등록되었습니다.');
        navigate('/goods'); //상품 목록 페이지로 이동
      })
      .catch(err => console.log(err));
  }

    const handleReset = () => {
    setForm(initialForm);
  };

    return (
     <section className="common_form">
      <h2>상품 등록하기</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label htmlFor="g_name">상품명 : </label>
          <input
            name="g_name"
            id="g_name"
            value={form.g_name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="g_cost">가격 : </label>
          <input
            type='number'
            name="g_cost"
            id="g_cost"
            value={form.g_cost}
            onChange={handleChange}
            required
          />
        </p>
        <p className="btn-group">
            <button type="submit" className="btn btn-primary">신규 상품 등록하기</button>
            <button type="reset" className="btn btn-secondary">다시 쓰기 또는 취소</button>
            <button type="button" className="btn btn-dark" onClick={() => navigate('/goods')}>목록 보기</button>
        </p>
      </form>
    </section>
    );
}

export default Create;
