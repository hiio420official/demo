/* 생성일: 2025-05-23 */

import React, { useState, useCallback } from 'react';
import { CheckSquare } from 'lucide-react';
import styled from 'styled-components';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoFilter from './components/TodoFilter';
import type { TodoFilter as FilterType } from './types/todo';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
`;

const Container = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  
  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 0;
  
  @media (min-width: 640px) {
    padding: 3rem 0;
  }
`;

const EmptyIcon = styled.div`
  color: #9ca3af;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const EmptySubtext = styled.p`
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  
  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.75rem;
  color: #6b7280;
  
  @media (min-width: 640px) {
    margin-top: 3rem;
    font-size: 0.875rem;
  }
`;

/**
 * 메인 App 컴포넌트
 * @returns JSX.Element
 */
const App: React.FC = () => {
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    getFilteredTodos,
    activeCount,
    completedCount,
  } = useTodos();

  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  /**
   * 필터 변경 처리
   * @param filter 새로운 필터
   */
  const handleFilterChange = useCallback((filter: FilterType) => {
    setCurrentFilter(filter);
  }, []);

  /**
   * 필터링된 Todo 목록 가져오기
   */
  const filteredTodos = getFilteredTodos(currentFilter);

  return (
    <AppContainer>
      <Container>
        {/* 헤더 */}
        <Header>
          <LogoContainer>
            <CheckSquare color="#3b82f6" size={32} />
            <Title>
              Todo App
            </Title>
          </LogoContainer>
          <Subtitle>
            할 일을 효율적으로 관리하세요
          </Subtitle>
        </Header>

        {/* Todo 입력 */}
        <Section>
          <TodoInput onAdd={addTodo} />
        </Section>

        {/* Todo 필터 */}
        <Section>
          <TodoFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </Section>

        {/* Todo 목록 */}
        <TodoList>
          {filteredTodos.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <CheckSquare size={48} />
              </EmptyIcon>
              <EmptyText>
                {currentFilter === 'all' && '아직 할 일이 없습니다.'}
                {currentFilter === 'active' && '진행중인 할 일이 없습니다.'}
                {currentFilter === 'completed' && '완료된 할 일이 없습니다.'}
              </EmptyText>
              {currentFilter === 'all' && (
                <EmptySubtext>
                  위에서 새로운 할 일을 추가해보세요!
                </EmptySubtext>
              )}
            </EmptyState>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </TodoList>

        {/* 푸터 */}
        <Footer>
          <p>© 2025 Todo App. Mobile First Design으로 제작되었습니다.</p>
        </Footer>
      </Container>
    </AppContainer>
  );
};

export default App;
