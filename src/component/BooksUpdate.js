// src/component/BooksUpdate.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BooksUpdate() {
  // 1) URL 파라미터에서 num 꺼내기
  const { num } = useParams();

  // 2) 수정 폼 상태 선언
  //    (초기값으로 빈 문자열을 할당해 두고, GET 요청 후 실제 데이터를 넣을 예정)
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

  // 3) React Router navigation
  const navigate = useNavigate();

  // 4) 백엔드 주소 설정
  //    ▶ CloudType에 배포된 Public URL (실제 여러분 프로젝트 주소로 바꿔 주세요)
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';
  //    ▶ 로컬에서 테스트할 때만 주석을 바꿔서 사용하세요:
  // const BACKEND_URL = 'http://localhost:9070';

  // 5) 컴포넌트 마운트(렌더) 직후에 GET 요청 보내기
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/books/${num}`)
      .then(res => {
        console.log('서버 응답(책 상세):', res.data);
        setForm(res.data);
      })
      .catch(err => {
        console.error('GET /books/:num 조회 오류:', err);
      });
  }, [num, BACKEND_URL]);  // BACKEND_URL을 의존성 배열에 반드시 포함

  // 6) 폼 인풋 변경 시 상태 업데이트
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 7) “수정하기” 버튼 클릭 시 PUT 요청 보내기
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BACKEND_URL}/books/update/${num}`, form)
      .then(() => {
        alert('도서정보가 수정 완료되었습니다.');
        navigate('/books');
      })
      .catch(err => {
        console.error('PUT /books/update/:num 수정 오류:', err);
        alert('수정 중 오류가 발생했습니다. 콘솔을 확인해 주세요.');
      });
  };

  // 8) “다시 쓰기 또는 취소” 버튼 클릭 시 폼 초기화
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
      <h3>Books 도서 수정 페이지</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label htmlFor="num">번호 :</label>
          <input
            name="num"
            id="num"
            value={form.num}
            readOnly
          />
        </p>
        <p>
          <label htmlFor="name">상점명 :</label>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="area1">지역1 :</label>
          <input
            name="area1"
            id="area1"
            value={form.area1}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="area2">지역2 :</label>
          <input
            name="area2"
            id="area2"
            value={form.area2}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="area3">지역3 :</label>
          <input
            name="area3"
            id="area3"
            value={form.area3}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="BOOK_CNT">재고 :</label>
          <input
            name="BOOK_CNT"
            id="BOOK_CNT"
            value={form.BOOK_CNT}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="owner_nm">주인이름 :</label>
          <input
            name="owner_nm"
            id="owner_nm"
            value={form.owner_nm}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="tel_num">전화번호 :</label>
          <input
            name="tel_num"
            id="tel_num"
            value={form.tel_num}
            onChange={handleChange}
          />
        </p>

        {/* 버튼 그룹 */}
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
