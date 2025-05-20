import Editor from './components/Editor';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">TIPTAP 에디터</h1>
        <Editor />
      </div>
    </main>
  );
} 