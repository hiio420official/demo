import { EditorPlugin } from './types';

const handleImageUpload = (editor: HTMLDivElement, file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.createElement('img');
    img.src = e.target?.result as string;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    editor.appendChild(img);
  };
  reader.readAsDataURL(file);
};

export const createImagePlugin = (): EditorPlugin => {
  return {
    name: 'image',
    icon: '🖼',
    tooltip: '이미지',
    execute: () => {
      const input = document.getElementById('imageUpload') as HTMLInputElement;
      if (input) {
        input.click();
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const editor = document.querySelector('.editor-content') as HTMLDivElement;
            handleImageUpload(editor, file);
          }
        };
      }
    },
  };
}; 