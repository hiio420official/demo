import React, { useState } from 'react';
import { ModalPlugin } from './types';

const handleLink = (editor: HTMLDivElement, url: string) => {
  const selection = window.getSelection();
  if (selection && selection.toString()) {
    document.execCommand('createLink', false, url);
  }
};

export const createLinkPlugin = (): ModalPlugin => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');

  const onModalOk = () => {
    const editor = document.querySelector('.editor-content') as HTMLDivElement;
    handleLink(editor, linkUrl);
    setModalVisible(false);
    setLinkUrl('');
  };

  const onModalCancel = () => {
    setModalVisible(false);
    setLinkUrl('');
  };

  return {
    name: 'link',
    icon: '🔗',
    tooltip: '링크',
    execute: () => setModalVisible(true),
    modalContent: `
      <div class="modal-input-group">
        <input
          type="text"
          class="modal-input"
          placeholder="URL을 입력하세요"
          value="${linkUrl}"
          onchange="this.dispatchEvent(new CustomEvent('linkUrlChange', { detail: this.value }))"
        />
      </div>
    `,
    onModalOk,
    onModalCancel,
    isModalVisible,
    setModalVisible,
  };
}; 