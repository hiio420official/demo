import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Modal, Button, Space } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

// 테이블 모듈 등록
import Table from 'quill-better-table';
Quill.register({
  'modules/better-table': Table
}, true);

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
}

interface TableModule {
  insertTable: (rows: number, columns: number) => void;
}

const Editor = forwardRef<Quill, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const [isHtmlModalVisible, setIsHtmlModalVisible] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref && 'current' in ref) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    const handleHtmlEdit = () => {
      if (ref && 'current' in ref && ref.current) {
        setHtmlContent(ref.current.root.innerHTML);
        setIsHtmlModalVisible(true);
      }
    };

    const handleHtmlSave = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.root.innerHTML = htmlContent;
        setIsHtmlModalVisible(false);
      }
    };

    const handleHtmlCancel = () => {
      setIsHtmlModalVisible(false);
    };

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );

      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['table'],
        ['code-block'],
        ['clean']
      ];

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'table': function() {
                const tableModule = quill.getModule('better-table') as TableModule;
                tableModule.insertTable(3, 3);
              }
            }
          },
          'better-table': {
            operationMenu: {
              items: {
                insertColumnRight: {
                  text: '오른쪽에 열 삽입'
                },
                insertColumnLeft: {
                  text: '왼쪽에 열 삽입'
                },
                insertRowUp: {
                  text: '위에 행 삽입'
                },
                insertRowDown: {
                  text: '아래에 행 삽입'
                },
                deleteColumn: {
                  text: '열 삭제'
                },
                deleteRow: {
                  text: '행 삭제'
                },
                deleteTable: {
                  text: '테이블 삭제'
                }
              }
            }
          }
        }
      });

      // HTML 편집 버튼 추가
      const htmlButton = document.createElement('button');
      htmlButton.innerHTML = '<i class="ql-code"></i>';
      htmlButton.className = 'ql-html';
      htmlButton.onclick = handleHtmlEdit;
      const toolbar = editorContainer.querySelector('.ql-toolbar');
      if (toolbar) {
        toolbar.appendChild(htmlButton);
      }

      // 비디오 업로드 핸들러
      const videoHandler = () => {
        const url = prompt('비디오 URL을 입력하세요:');
        if (url) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'video', url);
        }
      };

      const videoButton = document.createElement('button');
      videoButton.innerHTML = '비디오';
      videoButton.className = 'ql-video';
      videoButton.onclick = videoHandler;
      if (toolbar) {
        toolbar.appendChild(videoButton);
      }

      if (ref && 'current' in ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (ref && 'current' in ref) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]);

    return (
      <>
        <div ref={containerRef} style={{ height: '400px' }}></div>
        <Modal
          title="HTML 편집"
          open={isHtmlModalVisible}
          onOk={handleHtmlSave}
          onCancel={handleHtmlCancel}
          width={800}
          footer={[
            <Button key="cancel" onClick={handleHtmlCancel}>
              취소
            </Button>,
            <Button key="save" type="primary" onClick={handleHtmlSave}>
              저장
            </Button>
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button 
                icon={<CodeOutlined />} 
                onClick={() => {
                  if (ref && 'current' in ref && ref.current) {
                    setHtmlContent(ref.current.root.innerHTML);
                  }
                }}
              >
                에디터 내용 가져오기
              </Button>
            </Space>
          </div>
          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              fontFamily: 'monospace',
              padding: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px'
            }}
          />
        </Modal>
      </>
    );
  },
);

Editor.displayName = 'Editor';

export default Editor; 