import { EditorPlugin } from './types';

export const alignLeftPlugin: EditorPlugin = {
  name: 'alignLeft',
  icon: '⬅️',
  tooltip: '왼쪽 정렬',
  execute: (editor) => {
    document.execCommand('justifyLeft', false);
  },
};

export const alignCenterPlugin: EditorPlugin = {
  name: 'alignCenter',
  icon: '↔️',
  tooltip: '가운데 정렬',
  execute: (editor) => {
    document.execCommand('justifyCenter', false);
  },
};

export const alignRightPlugin: EditorPlugin = {
  name: 'alignRight',
  icon: '➡️',
  tooltip: '오른쪽 정렬',
  execute: (editor) => {
    document.execCommand('justifyRight', false);
  },
}; 