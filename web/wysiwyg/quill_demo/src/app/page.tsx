'use client';

import { useRef, useState } from 'react';
import { Layout, Typography, Card, Space, Button } from 'antd';
import { SaveOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons';
import Quill from 'quill';
import Editor from '@/components/Editor';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const editorRef = useRef<Quill>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleTextChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.root.innerHTML;
      setHistory(prev => [...prev.slice(0, historyIndex + 1), content]);
      setHistoryIndex(prev => prev + 1);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0 && editorRef.current) {
      setHistoryIndex(prev => prev - 1);
      editorRef.current.root.innerHTML = history[historyIndex - 1];
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && editorRef.current) {
      setHistoryIndex(prev => prev + 1);
      editorRef.current.root.innerHTML = history[historyIndex + 1];
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.root.innerHTML;
      console.log('저장된 내용:', content);
      // 여기에 저장 로직을 구현할 수 있습니다
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ margin: '16px 0' }}>Quill 에디터 데모</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Card>
          <Space style={{ marginBottom: 16 }}>
            <Button icon={<UndoOutlined />} onClick={handleUndo} disabled={historyIndex <= 0}>
              실행 취소
            </Button>
            <Button icon={<RedoOutlined />} onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              다시 실행
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              저장
            </Button>
          </Space>
          <div style={{ height: '500px' }}>
            <Editor
              ref={editorRef}
              onTextChange={handleTextChange}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
}
