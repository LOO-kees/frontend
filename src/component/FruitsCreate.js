import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FruitsCreate = () => {
  // 1. 상태변수 선언 (사용자가 입력한 값을 저장)
  const [form, setForm] = useState({
    name: '',
    price: '',
    color: '',
    country: ''
  });

  const navigate = useNavigate();

  // 2. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 상태(CloudType)에서는 Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 4. “상품등록” 버튼 클릭 시 POST 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/fruits`, form)
      .then(() => {
        alert('상품등록이 완료되었습니다.');
        navigate('/fruits');
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="common_form">
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}> 
        <p>
          <label for='name'>상품명(name)</label> : 
          <input type="text"  id='name' name='name'
          value={form.name}
          onChange={handleChange}
          required
          />
        </p>

        <p>
          <label for='price'>가격(price)</label> : 
          <input type="text"  id='price' name='price'
          value={form.price}
          onChange={handleChange}
          required
          />
        </p>

        <p>
          {/* 컬러는 셀렉트문으로 할 수 도 있다. */}
          <label for='color'>컬러(color)</label> : 
          <input type="text"  id='color' name='color'
          value={form.color}
          onChange={handleChange}
          required
          />
        </p>

        <p>
          <label for='country'>원산지(country): </label> 
          {/* 원산지는 셀렉트문으로 할 수 도 있다. */}
          <select
          id='country' name='country'
          value={form.country}
          onChange={handleChange}
          required
          >
            <option value="">--원산지--</option>
            <option value="대한민국">대한민국</option>
            <option value="필리핀">필리판</option>
            <option value="중국">중국</option>
            <option value="미국">미국</option>
            <option value="일본">일본</option>
            <option value="말레이시아">말레이시아</option>
          </select>
        </p>
        
        <p className="btn-group">
            <button type="submit" className="btn btn-primary">상품 등록</button>
        </p>
            
      </form>
    </section>
  );
}

export default FruitsCreate;
