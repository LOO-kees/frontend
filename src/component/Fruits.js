import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Fruits(props) {
  // 1. 상태변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // AlertContext에서 setFruitsCount 함수 읽어오기 (한 번만 선언)
  const { setFruitsCount } = useContext(AlertContext);

  // 페이지 번호 저장을 위한 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); // 초기값
  const itemsPerPage = 5; // 한 페이지에 보여지는 게시물 개수

  // 2. 백엔드 Public URL 설정
  // 로컬에서 개발/테스트할 때만 아래 줄을 주석 해제하세요:
  // const BACKEND_URL = 'http://localhost:9070';
  // 배포 상태(CloudType)에서는 Public URL을 사용합니다:
  const BACKEND_URL = 'https://port-0-backend-mbioc25168a38ca1.sel4.cloudtype.app';

  // 3. 상품 리스트 조회 (GET /fruits)
  const loadData = useCallback(() => {
    axios
      .get(`${BACKEND_URL}/fruits`)
      .then(res => {
        setData(res.data);
        setFruitsCount(res.data.length);
      })
      .catch(err => console.log(err));
  }, [setFruitsCount]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 4. 페이지 계산: indexOfLast, indexOfFirst, slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  // 5. 전체 페이지 수 계산
  const totalPage = Math.ceil(data.length / itemsPerPage);

  // 6. 페이지 번호 그룹 계산 (예: currentPage 기준으로 5개씩)
  let startPage = Math.max(1, currentPage - 2);
  let lastPage = Math.min(totalPage, startPage + 4);
  const pageNumbers = Array.from(
    { length: lastPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // 7. 삭제 (DELETE /fruits/:num)
  const deleteData = (num) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`${BACKEND_URL}/fruits/${num}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <section className="common_table">
      <h3>과일 DB입력/출력/삭제/수정</h3>
      <div style={{height: '360px'}}>
        <table>
          <caption>Fruits Data</caption>
          <thead>
            <tr>
              <th>num(코드번호)</th>
              <th>name(과일이름)</th>
              <th>price(가격)</th>
              <th>color(색상)</th>
              <th>country(원산지)</th>
              <th>메뉴</th>
            </tr>
          </thead>
          <tbody>
            {
              //db데이터가 저장된 currentItems변수를 map함수로 반복하여 출력한다.
              currentItems.map(item => (  // ← data → currentItems로 변경
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.name}</td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>{item.color}</td>
                  <td>{item.country}</td>
                  <td>
                    <button onClick={() => navigate(`/fruits/update/${item.num}`)}>
                      수정
                    </button>
                    &nbsp;
                    <button onClick={() => deleteData(item.num)}>삭제</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      
      {/* 페이징 */}
      <p className="pagination">
        {/* 이전 버튼 (항상 렌더링, disabled 시 visibility: hidden) */}
        <button
          className="page-btn prev-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        {/* 페이지 번호 버튼 그룹 (flex:1, min-width 유지) */}
        <span className="pages">
          {pageNumbers.map(number => (
            <button
              key={number}
              className={currentPage === number ? 'active' : ''}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </span>

        {/* 다음 버튼 */}
        <button
          className="page-btn next-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          다음
        </button>
      </p>

      {/* 상품등록 버튼 */}
      <p style={{ textAlign: 'right', width: '90%', margin: '10px auto' }}>
        <button onClick={() => navigate('/fruits/create')} className="register-btn">
          상품 등록
        </button>
      </p>
    </section>
  );
}

export default Fruits;
