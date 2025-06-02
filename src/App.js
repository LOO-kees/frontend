// src/App.js
import React from 'react';                            // React만 import
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import './css/common.css';
import Main from './component/Main';
import Goods from './component/Goods';
import Create from './component/Create';
import Update from './component/Update';
import Books from './component/Books';
import BooksUpdate from './component/BooksUpdate';
import BooksCreate from './component/BooksCreate';
import Fruits from './component/Fruits';
import FruitsUpdate from './component/FruitsUpdate';
import FruitsCreate from './component/FruitsCreate';
import Question from './component/Question';
import Login from './component/Login';
import Register from './component/Register';
import Login2 from './component/Login2';
import Register2 from './component/Register2';
// AlertContext에서 프로바이더와 컨텍스트를 불러옴
import { AlertProvider, AlertContext } from './AlertContext';

function AppContent() {
  // React.useContext로 questionCount, goodsCount, booksCount, fruitsCount 가져오기
  const { questionCount, goodsCount, booksCount, fruitsCount } = React.useContext(AlertContext);

  return (
    <BrowserRouter>
      <header className='header_style'>
        <h1>Frontend셋팅 - React + MySQL(메인페이지)</h1>
        <nav className='nav_style'>
           <div className='nav_txt'>
          
            <Link to='/'>Home</Link>
            
              <Link to='/goods'>
                Goods
                {goodsCount > 0 && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: 6,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '14px',
                    textAlign: 'center',
                    lineHeight: '22px',
                    fontWeight: 'bold'
                  }}>
                    {goodsCount}
                  </span>
                )}
              </Link>
            
          <Link to='/books'>
            Books
            {booksCount > 0 && (
              <span style={{
                display: 'inline-block',
                marginLeft: 6,
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                fontSize: '14px',
                textAlign: 'center',
                lineHeight: '22px',
                fontWeight: 'bold'
              }}>
                {booksCount}
              </span>
            )}
          </Link>
            <Link to='/fruits'>
              Fruits
              {fruitsCount > 0 && (
                <span style={{
                  display: 'inline-block',
                  marginLeft: 6,
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight: '22px',
                  fontWeight: 'bold'
                }}>
                  {fruitsCount}
                </span>
              )}
            </Link>
            
              <Link to='/question'>
                Question
                {questionCount > 0 && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: 6,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '14px',
                    textAlign: 'center',
                    lineHeight: '22px',
                    fontWeight: 'bold'
                  }}>
                    {questionCount}
                  </span>
                )}
              </Link>
            
            <Link to='/login'>Login</Link>
            <Link to='/login2'>Login2</Link>
          
          </div>
        </nav>
      </header>

      <main className='main_style'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/goods' element={<Goods />} />
          <Route path='/goods/update/:g_code' element={<Update />} />
          <Route path='/goods/create' element={<Create />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/update/:num' element={<BooksUpdate />} />
          <Route path='/books/create' element={<BooksCreate />} />
          <Route path='/fruits' element={<Fruits />} />
          <Route path='/fruits/update/:num' element={<FruitsUpdate />} />
          <Route path='/fruits/create' element={<FruitsCreate />} />
          <Route path='/question' element={<Question />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/register2' element={<Register2 />} />
        </Routes>
      </main>

      <footer className='footer_style'>
        <address>Copyright&copy;2025 Backend&Frontend allrights reserved.</address>
      </footer>
    </BrowserRouter>
  );
}

// AlertProvider로 감싸서 context를 공급
function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;
