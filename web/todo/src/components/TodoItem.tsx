/* 생성일: 2025-05-23 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

/**
 * TodoItem 컴포넌트의 Props 인터페이스
 */
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

// Styled Components
interface TodoItemContainerProps {
  completed: boolean;
}

const TodoItemContainer = styled.div<TodoItemContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  opacity: ${props => props.completed ? 0.75 : 1};
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  @media (min-width: 640px) {
    padding: 1rem;
  }
`;

interface CheckboxProps {
  completed: boolean;
}

const Checkbox = styled.button<CheckboxProps>`
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${props => props.completed ? '#3b82f6' : '#d1d5db'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, border-color 0.2s;
  background-color: ${props => props.completed ? '#3b82f6' : 'transparent'};
  color: white;
  
  &:hover {
    border-color: ${props => props.completed ? '#3b82f6' : '#93c5fd'};
  }
  
  @media (min-width: 640px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

interface TodoTextProps {
  completed: boolean;
}

const TodoText = styled.span<TodoTextProps>`
  display: block;
  font-size: 0.875rem;
  word-break: break-word;
  cursor: pointer;
  ${props => props.completed ? 'text-decoration: line-through; color: #6b7280;' : 'color: #1f2937;'}
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const TodoInput = styled.input`
  width: 100%;
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

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.25rem;
  
  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

interface ActionButtonProps {
  variant: 'green' | 'blue' | 'red' | 'gray';
}

const ActionButton = styled.button<ActionButtonProps>`
  padding: 0.375rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  ${props => {
    switch (props.variant) {
      case 'green':
        return `
          color: #059669;
          &:hover {
            background-color: #d1fae5;
          }
        `;
      case 'blue':
        return `
          color: #2563eb;
          &:hover {
            background-color: #dbeafe;
          }
        `;
      case 'red':
        return `
          color: #dc2626;
          &:hover {
            background-color: #fee2e2;
          }
        `;
      case 'gray':
      default:
        return `
          color: #6b7280;
          &:hover {
            background-color: #f3f4f6;
          }
        `;
    }
  }}
  
  @media (min-width: 640px) {
    padding: 0.5rem;
  }
`;

/**
 * Todo 아이템 컴포넌트
 * @param props TodoItem 컴포넌트 props
 * @returns JSX.Element
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  /**
   * 편집 모드 시작
   */
  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(todo.text);
  }, [todo.text]);

  /**
   * 편집 저장
   */
  const handleSaveEdit = useCallback(() => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  }, [editText, todo.id, todo.text, onEdit]);

  /**
   * 편집 취소
   */
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText(todo.text);
  }, [todo.text]);

  /**
   * 키보드 이벤트 처리
   * @param e 키보드 이벤트
   */
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  }, [handleSaveEdit, handleCancelEdit]);

  /**
   * Todo 토글 처리
   */
  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  /**
   * Todo 삭제 처리
   */
  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  return (
    <TodoItemContainer completed={todo.completed}>
      {/* 완료 체크박스 */}
      <Checkbox
        onClick={handleToggle}
        completed={todo.completed}
        aria-label={todo.completed ? '완료 취소' : '완료 표시'}
      >
        {todo.completed && <Check size={14} />}
      </Checkbox>

      {/* Todo 텍스트 또는 편집 입력 */}
      <TextContainer>
        {isEditing ? (
          <TodoInput
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSaveEdit}
            autoFocus
            placeholder="Todo를 입력하세요..."
          />
        ) : (
          <TodoText
            completed={todo.completed}
            onClick={handleStartEdit}
          >
            {todo.text}
          </TodoText>
        )}
      </TextContainer>

      {/* 액션 버튼들 */}
      <ActionButtons>
        {isEditing ? (
          <>
            <ActionButton
              onClick={handleSaveEdit}
              variant="green"
              aria-label="저장"
            >
              <Check size={16} />
            </ActionButton>
            <ActionButton
              onClick={handleCancelEdit}
              variant="gray"
              aria-label="취소"
            >
              <X size={16} />
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton
              onClick={handleStartEdit}
              variant="blue"
              aria-label="편집"
            >
              <Edit2 size={16} />
            </ActionButton>
            <ActionButton
              onClick={handleDelete}
              variant="red"
              aria-label="삭제"
            >
              <Trash2 size={16} />
            </ActionButton>
          </>
        )}
      </ActionButtons>
    </TodoItemContainer>
  );
};

export default React.memo(TodoItem); 