// 생성 날짜: 2024-09-16
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../data/boardData';

interface BoardListProps {
  posts: Post[];
}

/**
 * 게시판 목록 컴포넌트
 * 게시글 목록을 테이블 형태로 표시
 */
const BoardList: React.FC<BoardListProps> = ({ posts }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 페이지네이션 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <TopSection>
        <Title>게시판</Title>
        <WriteButton onClick={() => navigate('/board/write')}>글쓰기</WriteButton>
      </TopSection>
      
      <Table>
        <thead>
          <TableRow>
            <TableHeader width="10%">번호</TableHeader>
            <TableHeader width="50%">제목</TableHeader>
            <TableHeader width="15%">작성자</TableHeader>
            <TableHeader width="15%">날짜</TableHeader>
            <TableHeader width="10%">조회</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell align="left">
                  <PostLink to={`/board/${post.id}`}>{post.title}</PostLink>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{formatDate(post.createdAt)}</TableCell>
                <TableCell>{post.views}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>게시글이 없습니다.</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      
      <PaginationContainer>
        <PaginationButton 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          이전
        </PaginationButton>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <PageNumber 
            key={index + 1}
            isActive={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageNumber>
        ))}
        
        <PaginationButton 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          다음
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray800};
`;

const WriteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: #0069d9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    overflow-x: auto;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

interface TableHeaderProps {
  width?: string;
}

const TableHeader = styled.th<TableHeaderProps>`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
  background-color: ${({ theme }) => theme.colors.gray100};
  width: ${({ width }) => width || 'auto'};
`;

interface TableCellProps {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
}

const TableCell = styled.td<TableCellProps>`
  padding: 0.75rem 1rem;
  text-align: ${({ align }) => align || 'center'};
  color: ${({ theme }) => theme.colors.gray700};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const PostLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray800};
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray700};
  transition: all ${({ theme }) => theme.transition};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray900};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface PageNumberProps {
  isActive: boolean;
}

const PageNumber = styled.button<PageNumberProps>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : theme.colors.white};
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.white : theme.colors.gray700};
  transition: all ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ isActive, theme }) => 
      isActive ? theme.colors.primary : theme.colors.gray100};
    color: ${({ isActive, theme }) => 
      isActive ? theme.colors.white : theme.colors.gray900};
  }
`;

export default BoardList; 