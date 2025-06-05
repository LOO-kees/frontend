// src/component/Books.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Books(props) {
  // 1. 도서 리스트 & 페이징 상태
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // AlertContext에서 setBooksCount 함수는 여기서 한 번만 선언
  const { setBooksCount } = useContext(AlertContext);

  // 2. 백엔드 Public URL 설정
  // (로컬 개발/테스트 시에는 아래 줄을 주석 해제하고 사용하세요)
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 상태에서는 CloudType Public URL을 사용합니다:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 데이터 로드 (GET /books)
  const loadData = useCallback(() => {
    axios
      .get(`${BACKEND_URL}/books`)
      .then(res => {
        setData(res.data);
        setBooksCount(res.data.length); // AlertContext로 개수 업데이트
      })
      .catch(err => console.log(err));
  }, [setBooksCount]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 4. 전체 페이지 수
  const totalPage = Math.ceil(data.length / itemsPerPage);

  // 5. 현재 페이지에 보여줄 데이터만 잘라내기
  const idxLast = currentPage * itemsPerPage;
  const idxFirst = idxLast - itemsPerPage;
  const currentItems = data.slice(idxFirst, idxLast);

  // 6. 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  // 7. 삭제 (DELETE /books/:num)
  const deleteData = (num) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    axios
      .delete(`${BACKEND_URL}/books/${num}`)
      .then(() => {
        alert('삭제되었습니다.');
        loadData(); // 다시 목록 갱신
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="common_table">
      <h3>교보문고 DB입력/출력/삭제/수정</h3>
      <table>
        <caption>Books Data</caption>
        <thead>
          <tr>
            <th>num(코드번호)</th>
            <th>name(상점이름)</th>
            <th>area1(지역1)</th>
            <th>area2(지역2)</th>
            <th>area3(지역3)</th>
            <th>BOOK_CNT(재고)</th>
            <th>owner_nm(주인이름)</th>
            <th>tel_num(전화번호)</th>
            <th>메뉴</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.num}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{item.area1}</td>
              <td>{item.area2}</td>
              <td>{item.area3}</td>
              <td>{Number(item.BOOK_CNT).toLocaleString()}</td>
              <td>{item.owner_nm}</td>
              <td>{item.tel_num}</td>
              <td>
                <button onClick={() => navigate(`/books/update/${item.num}`)}>
                  수정
                </button>{' '}
                <button onClick={() => deleteData(item.num)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 */}
      <p className="pagination">
        <button
          className="page-btn prev-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        <span className="pages">
          {pageNumbers.map(num => (
            <button
              key={num}
              className={currentPage === num ? 'active' : ''}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </span>

        <button
          className="page-btn next-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          다음
        </button>
      </p>

      {/* 등록 버튼 */}
      <p style={{ textAlign: 'right', width: '90%', margin: '10px auto' }}>
        <button
          onClick={() => navigate('/books/create')}
          className="register-btn"
        >
          도서 등록
        </button>
      </p>
    </section>
  );
}

export default Books;
