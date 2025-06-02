import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FruitsUpdate() {
  //1. 변수선언 과일 정보
  const { num } = useParams();
  const [form, setForm] = useState({
    num: '',
    name: '',
    price: '',
    color: '',
    country: ''
  });

  const navigate = useNavigate();

  //2. 서버측에 넘길 데이터(num)를 통신해서 성공, 실패여부 출력
  useEffect(() => {
    axios
      .get(`http://localhost:9070/fruits/${num}`)
      .then(res => {
        console.log('서버 응답값(fruit 상세):', res.data);
        setForm(res.data);
      })
      .catch(err => console.log('조회 오류(fruit) :', err));
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
      .put(`http://localhost:9070/fruits/update/${num}`, form)
      .then(() => {
        alert('과일 정보가 수정 완료되었습니다.');
        navigate('/fruits');
      })
      .catch(err => console.log('수정 오류(fruit) :', err));
  };

  const handleReset = () => {
    setForm({ num: form.num, name: '', price: '', color: '', country: '' });
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
