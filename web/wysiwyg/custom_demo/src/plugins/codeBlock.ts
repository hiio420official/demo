import { EditorPlugin } from './types';

const insertCodeBlock = (editor: HTMLDivElement) => {
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  pre.appendChild(code);
  editor.appendChild(pre);
  code.focus();
};

export const codeBlockPlugin: EditorPlugin = {
  name: 'codeBlock',
  icon: '📝',
  tooltip: '코드 블록',
  execute: insertCodeBlock,
}; 