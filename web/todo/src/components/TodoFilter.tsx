/* 생성일: 2025-05-23 */

import React, { useCallback } from 'react';
import styled from 'styled-components';
import type { TodoFilter as FilterType } from '../types/todo';

/**
 * TodoFilter 컴포넌트의 Props 인터페이스
 */
interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

/**
 * 필터 옵션 정의
 */
const filterOptions: { key: FilterType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행중' },
  { key: 'completed', label: '완료' },
];

// Styled Components
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.25rem;
  
  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.2s, color 0.2s;
  
  ${props => props.active ? `
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  ` : `
    background-color: #f3f4f6;
    color: #374151;
    &:hover {
      background-color: #e5e7eb;
    }
  `}
  
  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #4b5563;
  
  @media (min-width: 640px) {
    gap: 1rem;
    font-size: 0.875rem;
  }
`;

const StatText = styled.span``;

const ActiveCount = styled.span`
  font-weight: 600;
  color: #2563eb;
`;

const CompletedCount = styled.span`
  font-weight: 600;
  color: #059669;
`;

const ClearButton = styled.button`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: #dc2626;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #fee2e2;
  }
  
  @media (min-width: 640px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
`;

/**
 * Todo 필터 컴포넌트
 * @param props TodoFilter 컴포넌트 props
 * @returns JSX.Element
 */
const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  /**
   * 필터 변경 처리
   * @param filter 선택된 필터
   */
  const handleFilterChange = useCallback((filter: FilterType) => {
    onFilterChange(filter);
  }, [onFilterChange]);

  /**
   * 완료된 항목 삭제 처리
   */
  const handleClearCompleted = useCallback(() => {
    onClearCompleted();
  }, [onClearCompleted]);

  return (
    <FilterContainer>
      {/* 필터 버튼들 */}
      <ButtonGroup>
        {filterOptions.map(({ key, label }) => (
          <FilterButton
            key={key}
            active={currentFilter === key}
            onClick={() => handleFilterChange(key)}
          >
            {label}
          </FilterButton>
        ))}
      </ButtonGroup>

      {/* 통계 정보 */}
      <StatsContainer>
        <StatText>
          진행중: <ActiveCount>{activeCount}</ActiveCount>
        </StatText>
        <StatText>
          완료: <CompletedCount>{completedCount}</CompletedCount>
        </StatText>
        
        {/* 완료된 항목 삭제 버튼 */}
        {completedCount > 0 && (
          <ClearButton onClick={handleClearCompleted}>
            완료된 항목 삭제
          </ClearButton>
        )}
      </StatsContainer>
    </FilterContainer>
  );
};

export default React.memo(TodoFilter); 