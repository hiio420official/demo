import { EditorPlugin } from './types';

export const boldPlugin: EditorPlugin = {
  name: 'bold',
  icon: '🔷',
  tooltip: '굵게 (Ctrl+B)',
  shortcut: 'Ctrl+B',
  execute: (editor) => {
    document.execCommand('bold', false);
  },
};

export const italicPlugin: EditorPlugin = {
  name: 'italic',
  icon: '🔸',
  tooltip: '기울임 (Ctrl+I)',
  shortcut: 'Ctrl+I',
  execute: (editor) => {
    document.execCommand('italic', false);
  },
};

export const underlinePlugin: EditorPlugin = {
  name: 'underline',
  icon: '🔹',
  tooltip: '밑줄 (Ctrl+U)',
  shortcut: 'Ctrl+U',
  execute: (editor) => {
    document.execCommand('underline', false);
  },
}; 