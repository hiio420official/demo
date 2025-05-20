import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import Editor from './components/Editor';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <Layout className="app-container">
      <Header className="header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          WYSIWYG 에디터
        </Title>
      </Header>
      <Content className="content">
        <div className="editor-wrapper">
          <Editor onChange={handleEditorChange} />
        </div>
      </Content>
    </Layout>
  );
};

export default App; 