'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, Typography, Space, Button, message } from 'antd';
import { SaveOutlined, ClearOutlined } from '@ant-design/icons';
import "suneditor/dist/css/suneditor.min.css";
import { ko } from "suneditor/src/lang";
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const { Title } = Typography;

export default function Home() {
  const [content, setContent] = useState('');

  const handleChange = (content: string) => {
    setContent(content);
  };

  const handleSave = () => {
    message.success('내용이 저장되었습니다.');
    console.log('저장된 내용:', content);
  };

  const handleClear = () => {
    setContent('');
    message.info('내용이 초기화되었습니다.');
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>SUNEDITOR 데모</Title>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                저장
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={handleClear}
              >
                초기화
              </Button>
            </Space>

            <SunEditor
              setContents={content}
              lang={ko}
              onChange={handleChange}
              setOptions={{
                buttonList: [
                  ['undo', 'redo'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                  ['removeFormat'],
                  ['fontColor', 'hiliteColor'],
                  ['indent', 'outdent'],
                  ['align', 'horizontalRule', 'list', 'table'],
                  ['link', 'image', 'video'],
                  ['fullScreen', 'showBlocks', 'codeView'],
                ],
                height: '500px',
                width: '100%',
                minHeight: '400px',
              }}

            />
          </Space>
        </Card>
      </Space>
    </main>
  );
}
