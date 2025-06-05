// src/component/Question.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

const Question = () => {
  // AlertContext에서 setQuestionCount 함수 가져오기
  const { setQuestionCount } = useContext(AlertContext);

  // 1. 상태 변수 선언
  const [FormData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    txtbox: ''
  });

  // 2. 백엔드 Public URL 설정
  // 로컬 개발/테스트 시:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 시 CloudType Public URL 사용:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. 문의 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // axios.post 시 BACKEND_URL로 변경
      await axios.post(`${BACKEND_URL}/question`, FormData);
      alert('질문이 등록되었습니다.');

      // 알림 개수 1 증가
      setQuestionCount((prev) => prev + 1);

      // 전송 후 폼 초기화
      setFormData({ name: '', tel: '', email: '', txtbox: '' });
    } catch {
      alert('오류가 발생되었습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="common_form qnq_form">
      <section>
        <h2>정성을 다해 답변을 해드리겠습니다.</h2>
        <div className="left_form">
          <p>
            <label htmlFor="name">성함</label>
            <input
              type="text"
              name="name"
              id="name"
              value={FormData.name}
              onChange={handleChange}
              placeholder="성함을 입력해주세요"
              required
            />
          </p>
          <p>
            <label htmlFor="tel">전화번호</label>
            <input
              type="text"
              name="tel"
              id="tel"
              value={FormData.tel}
              onChange={handleChange}
              placeholder="전화번호를 입력해주세요"
              required
            />
          </p>
          <p>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              value={FormData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              required
            />
          </p>
        </div>
        <div className="right_form">
          <label htmlFor="txtbox">내용</label>
          <textarea
            rows="10"
            cols="50"
            name="txtbox"
            id="txtbox"
            value={FormData.txtbox}
            onChange={handleChange}
            placeholder="내용을 입력해주세요."
            maxLength={300}  // 300자 제한
            required
          />
        </div>
        <div className="agree_wrap">
          <label htmlFor="agree">개인정보처리 방침에 동의합니다.</label>
          <input type="checkbox" required id="agree" />
        </div>
        <div className="btn-group">
          <input type="submit" value="보내기" />
        </div>
      </section>
    </form>
  );
};

export default Question;
