// src/component/Fruits.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Fruits(props) {
  //1. 상태변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // AlertContext에서 setFruitsCount 함수 읽어오기
  const { setFruitsCount } = useContext(AlertContext);

  //페이지 번호 저장을 위한 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); //초기값
  const itemsPerPage = 5; //한 페이지에 보여지는 게시물 개수

  //2. 상품 리스트 조회(출력)
  const loadData = useCallback(() => {
    //React비동기 통신
    axios
      //DB에서 json데이터를 불러온다.
      .get('http://localhost:9070/fruits')
      //성공시 데이터를 변수에 저장하고 알림 개수 업데이트
      .then(res => {
        setData(res.data);
        setFruitsCount(res.data.length);
      })
      //실패시 에러 출력
      .catch(err => console.log(err));
  }, [setFruitsCount]);

  //리액트 훅인 useEffect를 사용하여 컴포넌트가 처음 마운트 되었을 경우에만 loadData()함수를 실행함.
  useEffect(() => {
    loadData();
  }, [loadData]);

  //페이지 계산공식 현재 게시물 수 56개 / 5 = 11페이지
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산 10 - 5 = 5;
  const indexOfFirst = indexOfLast - itemsPerPage; // ← 변수명 오타 수정

  //data배열 중 현재 페이지에 해당하는 부분만 잘라냅니다.
  //예 : data.slice(5, 10) -> data[5],data[6],data[7],data[8],data[9]만 화면에 표시
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  //전체 페이지 수 totalPage - Math.ceil(13 / 5) =3, 무조건 올림
  const totalPage = Math.ceil(data.length / itemsPerPage);

  //시작번호와 끝번호를 계산 해야 한다.
  let startPage = Math.max(1, currentPage-2);
  let lastPage  = Math.min(totalPage, startPage + 4); 

  //페이지 번호 배열 (1~5를 동적으로 변환되도록 변경)
  const pageNumbers = Array.from(
    { length: lastPage - startPage + 1 },
    (_, i) => startPage + i
  );

  //삭제
  const deleteData = (num) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:9070/fruits/${num}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); // 삭제 후 목록 갱신
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
