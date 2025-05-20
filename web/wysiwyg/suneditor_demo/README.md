# SUNEDITOR React 데모

이 프로젝트는 [SUNEDITOR](https://github.com/JiHong88/suneditor)를 React와 Next.js 환경에서 사용하는 데모 페이지입니다.

## 주요 기능

- WYSIWYG 에디터의 모든 기본 기능 지원
  - 텍스트 서식 (굵게, 기울임, 밑줄 등)
  - 이미지, 링크, 테이블 삽입
  - 동영상 URL 임베딩 (YouTube, Vimeo 등)
  - 코드 뷰 및 전체화면 모드
- 한글 지원
- 저장 및 초기화 기능
- 반응형 디자인

## 기술 스택

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [SUNEDITOR](https://github.com/JiHong88/suneditor)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)

## 시작하기

먼저 필요한 패키지를 설치합니다:

```bash
npm install
```

개발 서버를 실행합니다:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx      # 메인 페이지 컴포넌트
│   ├── layout.tsx    # 레이아웃 컴포넌트
│   └── globals.css   # 전역 스타일
```

## 커스터마이징

### 에디터 설정

`src/app/page.tsx` 파일에서 SUNEDITOR의 설정을 수정할 수 있습니다:

```typescript
setOptions={{
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    // ... 추가 버튼
  ],
  height: '500px',
  width: '100%',
  minHeight: '400px',
}}
```

### 동영상 임베딩

에디터에서 동영상을 삽입하는 방법:

1. 툴바의 동영상 버튼 클릭
2. 지원되는 동영상 URL 입력:
   - YouTube (예: https://www.youtube.com/watch?v=VIDEO_ID)
   - Vimeo (예: https://vimeo.com/VIDEO_ID)
   - 기타 지원되는 동영상 플랫폼

### 스타일 커스터마이징

`src/app/globals.css` 파일에서 에디터의 스타일을 수정할 수 있습니다:

```css
.sun-editor {
  border-radius: 8px !important;
  border: 1px solid #d9d9d9 !important;
}
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
