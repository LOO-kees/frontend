import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FruitsUpdate() {
  // 1. URL 파라미터에서 num 꺼내기
  const { num } = useParams();

  // 2. 수정 폼 상태 선언 (초기값은 빈 문자열)
  const [form, setForm] = useState({
    num: '',
    name: '',
    price: '',
    color: '',
    country: ''
  });

  const navigate = useNavigate();

  // 3. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 상태에서는 CloudType Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 4. 컴포넌트 마운트 시 해당 과일(GET /fruits/:num) 정보 불러오기
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/fruits/${num}`)
      .then(res => {
        console.log('서버 응답값(fruit 상세):', res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류(fruit):', err));
  }, [num, BACKEND_URL]); // BACKEND_URL을 의존성 배열에 포함

  // 5. 입력값이 바뀔 때 상태 업데이트
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 6. “수정하기” 버튼 클릭 시 PUT 요청 (PUT /fruits/update/:num)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BACKEND_URL}/fruits/update/${num}`, form)
      .then(() => {
        alert('과일 정보가 수정 완료되었습니다.');
        navigate('/fruits');
      })
      .catch(err => console.log('수정 오류(fruit):', err));
  };

  // 7. “다시 쓰기 또는 취소” 버튼 클릭 시 폼 초기화
  const handleReset = () => {
    setForm({
      num: form.num,
      name: '',
      price: '',
      color: '',
      country: ''
    });
  };

  return (
    <section className="common_form">
      <h3>Fruits 과일 수정 페이지 입니다.</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label htmlFor="num">번호 : </label>
          <input name="num" id="num" value={form.num} readOnly />
        </p>
        <p>
          <label htmlFor="name">과일명 : </label>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="price">가격 : </label>
          <input
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="color">색상 : </label>
          <input
            name="color"
            id="color"
            value={form.color}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="country">원산지 : </label>
          <input
            name="country"
            id="country"
            value={form.country}
            onChange={handleChange}
          />
        </p>
        <p className="btn-group">
          <button type="submit" className="btn btn-primary">수정하기</button>
          <button type="reset" className="btn btn-secondary">다시 쓰기 또는 취소</button>
          <button type="button" className="btn btn-dark" onClick={() => navigate('/fruits')}>목록 보기</button>
        </p>
      </form>
    </section>
  );
}

export default FruitsUpdate;
