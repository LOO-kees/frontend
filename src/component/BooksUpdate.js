// src/component/BooksUpdate.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BooksUpdate() {
  // 1) URL 파라미터에서 'num' 꺼내기
  const { num } = useParams();

  // 2) 수정 폼에 사용할 상태 선언 (초기값은 빈 문자열)
  const [form, setForm] = useState({
    num: '',
    name: '',
    area1: '',
    area2: '',
    area3: '',
    BOOK_CNT: '',
    owner_nm: '',
    tel_num: ''
  });

  // React Router용 navigate 훅
  const navigate = useNavigate();

  // 3) 백엔드 Public URL 선언
  // (로컬 개발용으로 테스트할 땐 주석 해제 후 `http://localhost:9070` 사용 가능)
  // const BACKEND_URL = 'http://localhost:9070';
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 4) 컴포넌트 마운트 시 해당 도서(GET /books/:num) 정보 불러오기
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/books/${num}`)  // ← 백엔드 라우터와 정확히 일치
      .then(res => {
        console.log('서버 응답값(book 상세):', res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류(book) :', err));
  }, [num, BACKEND_URL]);  // ← BACKEND_URL도 의존성 배열에 포함

  // 5) 폼 입력값이 바뀔 때 상태 업데이트
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 6) “수정하기” 버튼 클릭 시 실행 (PUT /books/update/:num)
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${BACKEND_URL}/books/update/${num}`, form)  // ← 백엔드 라우터와 정확히 일치
      .then(() => {
        alert('도서정보가 수정 완료되었습니다.');
        navigate('/books');
      })
      .catch(err => console.log('수정 오류(book) :', err));
  };

  // 7) “다시 쓰기 또는 취소” 버튼 클릭 시 폼 초기화
  const handleReset = () => {
    setForm({
      num: form.num,
      name: '',
      area1: '',
      area2: '',
      area3: '',
      BOOK_CNT: '',
      owner_nm: '',
      tel_num: ''
    });
  };

  return (
    <section className="common_form">
      <h3>Books 도서 수정 페이지 입니다.</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label htmlFor="num">번호 : </label>
          <input name="num" id="num" value={form.num} readOnly />
        </p>

        <p>
          <label htmlFor="name">상점명 : </label>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="area1">지역1 : </label>
          <input
            name="area1"
            id="area1"
            value={form.area1}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="area2">지역2 : </label>
          <input
            name="area2"
            id="area2"
            value={form.area2}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="area3">지역3 : </label>
          <input
            name="area3"
            id="area3"
            value={form.area3}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="BOOK_CNT">재고 : </label>
          <input
            name="BOOK_CNT"
            id="BOOK_CNT"
            value={form.BOOK_CNT}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="owner_nm">주인이름 : </label>
          <input
            name="owner_nm"
            id="owner_nm"
            value={form.owner_nm}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="tel_num">전화번호 : </label>
          <input
            name="tel_num"
            id="tel_num"
            value={form.tel_num}
            onChange={handleChange}
          />
        </p>

        <p className="btn-group">
          <button type="submit" className="btn btn-primary">
            수정하기
          </button>
          <button type="reset" className="btn btn-secondary">
            다시 쓰기 또는 취소
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => navigate('/books')}
          >
            목록 보기
          </button>
        </p>
      </form>
    </section>
  );
}

export default BooksUpdate;
