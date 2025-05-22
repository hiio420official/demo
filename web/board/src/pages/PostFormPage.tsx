// 생성 날짜: 2024-09-16
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { dummyPosts, Post } from '../data/boardData';

/**
 * 게시글 폼 페이지 컴포넌트
 * 게시글 작성 및 수정 기능을 제공하는 페이지
 */
const PostFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  
  useEffect(() => {
    if (isEditMode) {
      // 수정 모드인 경우 데이터 로딩
      const timer = setTimeout(() => {
        const post = dummyPosts.find(p => p.id === parseInt(id!, 10));
        
        if (post) {
          setFormData({
            title: post.title,
            content: post.content,
            author: post.author
          });
        }
        
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    // 게시글 저장 (실제로는 API 호출)
    if (isEditMode) {
      // 수정 로직
      alert('게시글이 수정되었습니다.');
    } else {
      // 등록 로직
      alert('게시글이 등록되었습니다.');
    }
    
    navigate('/board');
  };
  
  if (isLoading) {
    return (
      <Layout>
        <LoadingWrapper>
          <LoadingText>게시글 정보를 불러오는 중...</LoadingText>
        </LoadingWrapper>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <FormContainer>
        <FormTitle>{isEditMode ? '게시글 수정' : '게시글 작성'}</FormTitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="author">작성자</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="작성자 이름을 입력하세요"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="content">내용</Label>
            <TextArea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              rows={10}
              required
            />
          </FormGroup>
          
          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate('/board')}>
              취소
            </CancelButton>
            <SubmitButton type="submit">
              {isEditMode ? '수정하기' : '등록하기'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
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

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  resize: vertical;
  font-size: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transition};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: #0069d9;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray700};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

export default PostFormPage;

 