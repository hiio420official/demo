// 생성 날짜: 2024-09-16
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Post } from '../data/boardData';

interface PostDetailProps {
  post: Post;
}

/**
 * 게시글 상세 컴포넌트
 * 게시글의 상세 내용을 표시
 */
const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  return (
    <Container>
      <Header>
        <Title>{post.title}</Title>
        <Info>
          <InfoItem>
            <Label>작성자:</Label> {post.author}
          </InfoItem>
          <InfoItem>
            <Label>작성일:</Label> {formatDate(post.createdAt)}
          </InfoItem>
          <InfoItem>
            <Label>조회수:</Label> {post.views}
          </InfoItem>
        </Info>
      </Header>
      
      <Content>{post.content}</Content>
      
      <ActionContainer>
        <LikeButton>
          👍 좋아요 {post.likes}
        </LikeButton>
        <ButtonGroup>
          <Button onClick={() => navigate('/board')}>목록</Button>
          <Button onClick={() => navigate(`/board/edit/${post.id}`)}>수정</Button>
          <DeleteButton onClick={() => {
            if (window.confirm('게시글을 삭제하시겠습니까?')) {
              // 삭제 로직 구현
              navigate('/board');
            }
          }}>삭제</DeleteButton>
        </ButtonGroup>
      </ActionContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.875rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Content = styled.div`
  padding: 2rem 1.5rem;
  min-height: 200px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray800};
  white-space: pre-wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 1rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const LikeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray800};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray700};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.danger};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.danger};
  }
`;

export default PostDetail; 