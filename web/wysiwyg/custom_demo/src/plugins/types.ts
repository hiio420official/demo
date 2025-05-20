import { ReactNode } from 'react';

export interface EditorPlugin {
  name: string;
  icon: string;
  tooltip: string;
  shortcut?: string;
  execute: (editor: HTMLDivElement) => void;
}

export interface ModalPlugin extends EditorPlugin {
  modalContent: string;
  onModalOk: () => void;
  onModalCancel: () => void;
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export interface PluginConfig {
  plugins: EditorPlugin[];
  modalPlugins: ModalPlugin[];
} 