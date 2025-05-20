import { EditorPlugin } from './types';

export const orderedListPlugin: EditorPlugin = {
  name: 'orderedList',
  icon: '📋',
  tooltip: '순서 있는 목록',
  execute: (editor) => {
    document.execCommand('insertOrderedList', false);
  },
};

export const unorderedListPlugin: EditorPlugin = {
  name: 'unorderedList',
  icon: '📝',
  tooltip: '순서 없는 목록',
  execute: (editor) => {
    document.execCommand('insertUnorderedList', false);
  },
}; 