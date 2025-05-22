// 생성 날짜: 2024-09-16
import React from 'react';
import styled from 'styled-components';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 레이아웃 컴포넌트
 * 공통 레이아웃을 제공하는 컴포넌트
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer>
        <p>© 2024 게시판 데모. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.gray300};
  padding: 2rem 1rem;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 1rem;
  }
`;

export default Layout; 