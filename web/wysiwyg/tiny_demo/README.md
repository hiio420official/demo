# TinyMCE 에디터 데모

Next.js와 TinyMCE를 사용한 WYSIWYG 에디터 데모 프로젝트입니다.

## 주요 기능

- 🎨 WYSIWYG 에디터 (TinyMCE)
- 📝 한글 지원
- 🖼️ 이미지 업로드 및 삽입
- 🎥 동영상 업로드 및 삽입
- 📱 반응형 디자인
- 🎯 Ant Design 컴포넌트 활용

## 기술 스택

- [Next.js](https://nextjs.org/) - React 프레임워크
- [TinyMCE](https://www.tiny.cloud/) - WYSIWYG 에디터
- [Ant Design](https://ant.design/) - UI 컴포넌트 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd tiny_demo
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 프로젝트 구조

```
tiny_demo/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Editor.tsx        # 메인 에디터 컴포넌트
│   │   │   └── TinyMCEEditor.tsx # TinyMCE 에디터 구현
│   │   ├── layout.tsx           # 레이아웃 설정
│   │   └── page.tsx             # 메인 페이지
│   └── ...
├── public/                      # 정적 파일
└── ...
```

## 사용된 주요 패키지

```json
{
  "dependencies": {
    "@tinymce/tinymce-react": "^4.3.2",
    "antd": "^5.0.0",
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

## 기능 설명

### 에디터 기능
- 텍스트 서식 (굵게, 기울임, 색상 등)
- 목록 및 들여쓰기
- 이미지 및 동영상 삽입
- 테이블 생성 및 편집
- 코드 보기 및 전체화면 모드

### UI/UX 특징
- 모던하고 깔끔한 디자인
- 반응형 레이아웃
- 직관적인 툴바 배치
- 실시간 미리보기

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 참고 자료

- [TinyMCE 공식 문서](https://www.tiny.cloud/docs/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Ant Design 공식 문서](https://ant.design/docs/react/introduce)
