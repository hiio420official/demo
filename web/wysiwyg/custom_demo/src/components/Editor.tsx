import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { createPluginConfig } from '../plugins';
import './Editor.css';

interface EditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialContent = '', onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const pluginConfig = createPluginConfig();

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      const plugin = pluginConfig.plugins.find(p => p.shortcut === `Ctrl+${e.key.toUpperCase()}`);
      if (plugin) {
        e.preventDefault();
        plugin.execute(editorRef.current!);
      }
    }
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <div className="toolbar-buttons">
          {pluginConfig.plugins.map((plugin) => (
            <button
              key={plugin.name}
              className="toolbar-button"
              title={plugin.tooltip}
              onClick={() => plugin.execute(editorRef.current!)}
            >
              {plugin.icon}
            </button>
          ))}
        </div>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <div
        ref={editorRef}
        className={`editor-content ${isFocused ? 'focused' : ''}`}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />

      {pluginConfig.modalPlugins.map((plugin) => (
        plugin.isModalVisible && (
          <div key={plugin.name} className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{plugin.tooltip}</h3>
                <button className="modal-close" onClick={plugin.onModalCancel}>×</button>
              </div>
              <div className="modal-content">
                {plugin.modalContent}
              </div>
              <div className="modal-footer">
                <button className="modal-button" onClick={plugin.onModalCancel}>취소</button>
                <button className="modal-button primary" onClick={plugin.onModalOk}>확인</button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Editor; 