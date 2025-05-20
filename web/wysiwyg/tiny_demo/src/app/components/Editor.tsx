'use client';
import { Content } from "antd/es/layout/layout";
import { Header } from "antd/es/layout/layout";
import dynamic from 'next/dynamic';
import Title from "antd/es/typography/Title";

const TinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>에디터 로딩중...</div>
});

export default function Editor() {
    return (
        <>
            <Header style={{ background: '#fff', padding: '0 20px' }}>
                <Title level={2} style={{ margin: '16px 0' }}>TinyMCE 데모</Title>
            </Header>
            <Content>
                <TinyMCEEditor />
            </Content>
        </>
    );
}
