import React from 'react';
import { EditorPlugin } from './types';

export const undoPlugin: EditorPlugin = {
  name: 'undo',
  icon: '⏪',
  tooltip: '실행 취소 (Ctrl+Z)',
  shortcut: 'Ctrl+Z',
  execute: (editor) => {
    document.execCommand('undo', false);
  },
};

export const redoPlugin: EditorPlugin = {
  name: 'redo',
  icon: '⏩',
  tooltip: '다시 실행 (Ctrl+Y)',
  shortcut: 'Ctrl+Y',
  execute: (editor) => {
    document.execCommand('redo', false);
  },
}; 