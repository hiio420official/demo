import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import PostDetailPage from './pages/PostDetailPage';
import PostFormPage from './pages/PostFormPage';

/**
 * 앱 컴포넌트
 * 라우팅 설정 및 전역 스타일, 테마 적용
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/:id" element={<PostDetailPage />} />
          <Route path="/board/write" element={<PostFormPage />} />
          <Route path="/board/edit/:id" element={<PostFormPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
