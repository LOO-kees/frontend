import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BooksCreate = () => {
  const initialForm = { name: '', area1: '', area2: '', area3: '', BOOK_CNT: '', owner_nm: '', tel_num: '' };
  const [form, setForm] = useState(initialForm);

  // num은 자동증가라서 데이터베이스가서 해야된다. 우리가 하는게 아니다.

  //url주소관리
  const navigate = useNavigate();

  //사용자가 입력박스에 입력하면 함수 호출
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //신규 도서 등록하기 버튼 클릭시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:9070/books', form)
      .then(() => {
        alert('도서가 등록되었습니다.');
        navigate('/books');
      })
      .catch(err => console.log(err));
  };

    const handleReset = () => {
    setForm(initialForm);
  };

  return (
  <section className="common_form">
      <h2>도서 등록하기</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
            <button type="submit" className="btn btn-primary">신규 도서 등록하기</button>
            <button type="reset" className="btn btn-secondary">다시 쓰기 또는 취소</button>
            <button type="button" className="btn btn-dark" onClick={() => navigate('/books')}>목록 보기</button>
          </p>
      </form>
    </section>
  );
};

export default BooksCreate;
