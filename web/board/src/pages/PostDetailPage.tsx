// 생성 날짜: 2024-09-16
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PostDetail from '../components/PostDetail';
import { dummyPosts, Post } from '../data/boardData';

/**
 * 게시글 상세 페이지 컴포넌트
 * 특정 게시글의 상세 내용을 표시하는 페이지
 */
const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      if (id) {
        const foundPost = dummyPosts.find(p => p.id === parseInt(id, 10));
        
        if (foundPost) {
          // 조회수 증가 로직
          const updatedPost = { ...foundPost, views: foundPost.views + 1 };
          setPost(updatedPost);
        }
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <LoadingWrapper>
          <LoadingText>게시글을 불러오는 중...</LoadingText>
        </LoadingWrapper>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <ErrorWrapper>
          <ErrorTitle>게시글을 찾을 수 없습니다.</ErrorTitle>
          <ErrorDescription>
            요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
          </ErrorDescription>
          <BackButton onClick={() => navigate('/board')}>
            게시판으로 돌아가기
          </BackButton>
        </ErrorWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <PostDetail post={post} />
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

const ErrorWrapper = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 1rem;
`;

const ErrorDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: #0069d9;
  }
`;

export default PostDetailPage; 