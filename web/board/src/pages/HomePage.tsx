// 생성 날짜: 2024-09-16
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * 홈페이지 컴포넌트
 * 애플리케이션의 메인 페이지
 */
const HomePage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <HeroSection>
          <Title>게시판 데모</Title>
          <Description>
            React와 TypeScript로 구현된 게시판 데모 애플리케이션입니다.
            게시판 목록, 게시글 상세 보기, 페이지네이션 등 다양한 기능을 지원합니다.
          </Description>
          <ButtonContainer>
            <MainButton to="/board">게시판 바로가기</MainButton>
          </ButtonContainer>
        </HeroSection>
        
        <FeaturesSection>
          <SectionTitle>주요 기능</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>📋</FeatureIcon>
              <FeatureTitle>게시판 목록</FeatureTitle>
              <FeatureDescription>
                게시글 목록을 조회하고 페이지네이션 기능을 통해 쉽게 탐색할 수 있습니다.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📝</FeatureIcon>
              <FeatureTitle>게시글 작성</FeatureTitle>
              <FeatureDescription>
                새로운 게시글을 작성하고 등록할 수 있습니다.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>게시글 상세</FeatureTitle>
              <FeatureDescription>
                게시글의 상세 내용을 조회하고 좋아요 기능을 사용할 수 있습니다.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>반응형 디자인</FeatureTitle>
              <FeatureDescription>
                모바일부터 데스크톱까지 다양한 화면 크기에 최적화된 UI를 제공합니다.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray700};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MainButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: #0069d9;
  }
`;

const FeaturesSection = styled.section`
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 1.5rem;
  text-align: center;
  transition: transform ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.5;
`;

export default HomePage; 