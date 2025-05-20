# WYSIWYG 에디터

순수 TypeScript로 구현된 WYSIWYG(What You See Is What You Get) 에디터입니다. React와 함께 사용할 수 있으며, 모던한 디자인과 다양한 기능을 제공합니다.

## 주요 기능

### 텍스트 서식
- 🔷 굵게 (Ctrl+B)
- 🔸 기울임 (Ctrl+I)
- 🔹 밑줄 (Ctrl+U)

### 정렬
- ⬅️ 왼쪽 정렬
- ↔️ 가운데 정렬
- ➡️ 오른쪽 정렬

### 목록
- 📋 순서 있는 목록
- 📝 순서 없는 목록

### 기타 기능
- 📝 코드 블록
- 🖼 이미지 업로드
- 🔗 링크 삽입
- 📊 표 삽입
- ⏪ 실행 취소 (Ctrl+Z)
- ⏩ 다시 실행 (Ctrl+Y)

## 설치 방법

```bash
npm install
```

## 사용 방법

```tsx
import Editor from './components/Editor';

function App() {
  const handleChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <Editor
      initialContent="<p>초기 내용</p>"
      onChange={handleChange}
    />
  );
}
```

## Props

| Prop | 타입 | 필수 | 설명 |
|------|------|------|------|
| initialContent | string | ❌ | 에디터의 초기 내용 |
| onChange | (content: string) => void | ❌ | 내용이 변경될 때 호출되는 콜백 함수 |

## 커스터마이징

### 스타일 커스터마이징

`Editor.css` 파일을 수정하여 에디터의 스타일을 커스터마이징할 수 있습니다.

```css
.editor-container {
  /* 에디터 컨테이너 스타일 */
}

.toolbar {
  /* 툴바 스타일 */
}

.editor-content {
  /* 에디터 내용 영역 스타일 */
}
```

### 플러그인 커스터마이징

새로운 플러그인을 추가하거나 기존 플러그인을 수정할 수 있습니다.

```typescript
import { EditorPlugin } from './plugins/types';

const customPlugin: EditorPlugin = {
  name: 'custom',
  icon: '🔧',
  tooltip: '커스텀 기능',
  execute: (editor) => {
    // 커스텀 기능 구현
  },
};
```

## 기술 스택

- TypeScript
- React
- HTML5
- CSS3

## 라이선스

MIT License
