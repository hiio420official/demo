# WYSIWYG 에디터

Next.js와 TipTap을 사용한 현대적인 WYSIWYG 에디터 프로젝트입니다.

## 주요 기능

- **텍스트 서식**
  - 굵게, 기울임, 밑줄
  - 글자 크기 조절 (12px ~ 32px)
  - 글자 색상 변경
  - 줄 간격 조절 (1 ~ 3)

- **정렬 및 목록**
  - 왼쪽, 가운데, 오른쪽 정렬
  - 순서 있는/없는 목록

- **미디어 삽입**
  - 이미지 업로드 (드래그 앤 드롭 지원)
  - 비디오 업로드
  - YouTube 동영상 임베드

- **고급 기능**
  - 테이블 삽입 및 편집
  - HTML 직접 편집
  - 코드 블록 지원

## 기술 스택

- **프레임워크**: Next.js 14
- **에디터**: TipTap
- **UI 컴포넌트**: Ant Design
- **스타일링**: Tailwind CSS
- **언어**: TypeScript

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd wysiwyg
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
wysiwyg/
├── app/
│   ├── components/
│   │   └── Editor.tsx    # 메인 에디터 컴포넌트
│   ├── layout.tsx        # 레이아웃 설정
│   └── page.tsx          # 메인 페이지
├── public/              # 정적 파일
└── package.json         # 프로젝트 설정
```

## 사용된 주요 패키지

- `@tiptap/react`: TipTap 에디터 코어
- `@tiptap/starter-kit`: 기본 에디터 기능
- `@tiptap/extension-text-style`: 텍스트 스타일링
- `@tiptap/extension-color`: 색상 설정
- `@tiptap/extension-table`: 테이블 기능
- `antd`: UI 컴포넌트
- `tailwindcss`: 스타일링

## 개발 가이드

### 에디터 커스터마이징

에디터의 기능을 수정하거나 추가하려면 `app/components/Editor.tsx` 파일을 수정하세요.

### 스타일 수정

Tailwind CSS를 사용하여 스타일을 수정할 수 있습니다. 주요 스타일 클래스는 다음과 같습니다:

- 에디터 컨테이너: `border rounded-lg bg-white shadow-sm`
- 툴바: `border-b p-2 bg-gray-50`
- 에디터 영역: `min-h-[300px] max-h-[600px] overflow-y-auto`

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
