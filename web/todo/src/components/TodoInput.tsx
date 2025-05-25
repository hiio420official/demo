/* 생성일: 2025-05-23 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';

/**
 * TodoInput 컴포넌트의 Props 인터페이스
 */
interface TodoInputProps {
  onAdd: (text: string) => void;
}

// Styled Components
const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (min-width: 640px) {
    gap: 0.75rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

interface AddButtonProps {
  disabled: boolean;
}

const AddButton = styled.button<AddButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  
  ${props => props.disabled ? `
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  ` : `
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    
    &:hover {
      background-color: #2563eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `}
  
  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
  }
`;

const ButtonText = styled.span`
  display: none;
  
  @media (min-width: 640px) {
    display: inline;
  }
`;

/**
 * Todo 입력 컴포넌트
 * @param props TodoInput 컴포넌트 props
 * @returns JSX.Element
 */
const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');

  /**
   * Todo 추가 처리
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAdd(inputText.trim());
      setInputText('');
    }
  }, [inputText, onAdd]);

  /**
   * 입력값 변경 처리
   * @param e 입력 이벤트
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="새로운 할 일을 입력하세요..."
          autoFocus
        />
        <AddButton
          type="submit"
          disabled={!inputText.trim()}
          aria-label="할 일 추가"
        >
          <Plus size={18} />
          <ButtonText>추가</ButtonText>
        </AddButton>
      </InputContainer>
    </Form>
  );
};

export default React.memo(TodoInput); 