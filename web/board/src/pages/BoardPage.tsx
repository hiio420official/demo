// 생성 날짜: 2024-09-16
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import BoardList from '../components/BoardList';
import { dummyPosts } from '../data/boardData';

/**
 * 게시판 페이지 컴포넌트
 * 게시글 목록을 표시하는 페이지
 */
const BoardPage: React.FC = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <LoadingWrapper>
          <LoadingText>게시글을 불러오는 중...</LoadingText>
        </LoadingWrapper>
      ) : (
        <BoardList posts={posts} />
      )}
    </Layout>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 1.125rem;
`;

export default BoardPage; 