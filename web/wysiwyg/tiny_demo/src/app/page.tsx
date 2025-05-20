
import { Layout } from 'antd';
import Editor from './components/Editor';

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Editor />
    </Layout>
  );
}
