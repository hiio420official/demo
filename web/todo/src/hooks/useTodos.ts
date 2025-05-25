/* 생성일: 2025-05-23 */

import { useReducer, useCallback, useEffect } from 'react';
import type { Todo, TodoAction, TodoFilter } from '../types/todo';

/**
 * Todo 상태 인터페이스 정의
 */
interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

/**
 * Todo 리듀서 함수
 * @param state 현재 상태
 * @param action 액션 객체
 * @returns 새로운 상태
 */
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, updatedAt: new Date() }
            : todo
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      return state;
  }
};

/**
 * Todo 관리를 위한 커스텀 훅
 * @returns Todo 상태와 액션 함수들
 */
export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all' as TodoFilter,
  });

  /**
   * 로컬 스토리지에서 Todo 데이터 로드
   */
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        parsedTodos.forEach((todo: Todo) => {
          dispatch({ type: 'ADD_TODO', payload: { text: todo.text } });
        });
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, []);

  /**
   * Todo 데이터를 로컬 스토리지에 저장
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  /**
   * 새 Todo 추가
   * @param text Todo 텍스트
   */
  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { text: text.trim() } });
    }
  }, []);

  /**
   * Todo 완료 상태 토글
   * @param id Todo ID
   */
  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }, []);

  /**
   * Todo 삭제
   * @param id Todo ID
   */
  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }, []);

  /**
   * Todo 텍스트 수정
   * @param id Todo ID
   * @param text 새로운 텍스트
   */
  const editTodo = useCallback((id: string, text: string) => {
    if (text.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id, text: text.trim() } });
    }
  }, []);

  /**
   * 완료된 Todo 모두 삭제
   */
  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  /**
   * 필터에 따른 Todo 목록 반환
   * @param filter 필터 타입
   * @returns 필터링된 Todo 목록
   */
  const getFilteredTodos = useCallback((filter: TodoFilter) => {
    switch (filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos]);

  return {
    todos: state.todos,
    filteredTodos: getFilteredTodos(state.filter),
    filter: state.filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    getFilteredTodos,
    activeCount: state.todos.filter(todo => !todo.completed).length,
    completedCount: state.todos.filter(todo => todo.completed).length,
  };
}; 