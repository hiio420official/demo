// 생성 날짜: 2024-09-16
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴를 제공하는 컴포넌트
 */
const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Inner>
        <Logo to="/">게시판</Logo>
        <Nav>
          <NavItem to="/">홈</NavItem>
          <NavItem to="/board">게시판</NavItem>
        </Nav>
      </Inner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled(Link)`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
  transition: color ${({ theme }) => theme.transition};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Header; 