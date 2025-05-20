import React, { useState } from 'react';
import { EditorPlugin, ModalPlugin } from './types';

const insertTable = (editor: HTMLDivElement, rows: number, cols: number) => {
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.margin = '16px 0';

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      const td = document.createElement(i === 0 ? 'th' : 'td');
      td.style.border = '1px solid #d9d9d9';
      td.style.padding = '8px';
      td.style.textAlign = 'left';
      if (i === 0) {
        td.style.background = '#fafafa';
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  editor.appendChild(table);
};

export const createTablePlugin = (): ModalPlugin => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [rows, setRows] = React.useState(3);
  const [cols, setCols] = React.useState(3);

  const onModalOk = () => {
    const editor = document.querySelector('.editor-content') as HTMLDivElement;
    insertTable(editor, rows, cols);
    setModalVisible(false);
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };

  return {
    name: 'table',
    icon: '📊',
    tooltip: '표',
    execute: () => setModalVisible(true),
    modalContent: `
      <div class="modal-input-group">
        <div class="modal-input-row">
          <label>행:</label>
          <input
            type="number"
            class="modal-input"
            min="1"
            value="${rows}"
            onchange="this.dispatchEvent(new CustomEvent('rowsChange', { detail: this.value }))"
          />
        </div>
        <div class="modal-input-row">
          <label>열:</label>
          <input
            type="number"
            class="modal-input"
            min="1"
            value="${cols}"
            onchange="this.dispatchEvent(new CustomEvent('colsChange', { detail: this.value }))"
          />
        </div>
      </div>
    `,
    onModalOk,
    onModalCancel,
    isModalVisible,
    setModalVisible,
  };
}; 