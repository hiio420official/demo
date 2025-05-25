/* 생성일: 2025-05-23 */

/**
 * Todo 아이템의 인터페이스 정의
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Todo 필터 타입 정의
 */
export type TodoFilter = 'all' | 'active' | 'completed';

/**
 * Todo 액션 타입 정의
 */
export type TodoAction = 
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'CLEAR_COMPLETED' }; 