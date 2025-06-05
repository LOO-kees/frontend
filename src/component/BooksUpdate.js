import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BooksUpdate() {
  //1. 변수선언 도서 정보
  const { num } = useParams();
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

  const navigate = useNavigate();

// 3. 배포된 백엔드 Public URL(CloudType 주소)을 상수로 선언
  // (로컬 테스트할 때는 아래 줄을 주석 처리하고, 필요 시 'http://localhost:9070'을 사용)
  // const BACKEND_URL = 'http://localhost:9070';
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  //2. 서버측에 넘길 데이터(num)를 통신해서 성공, 실패여부 출력
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/books/${num}`)
      .then(res => {
        console.log('서버 응답값(book 상세):', res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류(book) :', err));
  }, [num]);

  //사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //수정하기 메뉴 클릭시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BACKEND_URL}/books/update/${num}`, form)
      .then(() => {
        alert('도서정보가 수정 완료되었습니다.');
        navigate('/books');
      })
      .catch(err => console.log('수정 오류(book) :', err));
  };

  const handleReset = () => { setForm({ num: form.num, name: '', area1: '', area2: '', area3: '', BOOK_CNT: '', owner_nm: '', tel_num: '' }); };
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
            <button type="submit" className="btn btn-primary">수정하기</button>
            <button type="reset" className="btn btn-secondary">다시 쓰기 또는 취소</button>
            <button type="button" className="btn btn-dark" onClick={() => navigate('/books')}>목록 보기</button>
          </p>
      </form>
    </section>
  );
}

export default BooksUpdate;
