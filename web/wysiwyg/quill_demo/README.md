# Quill 에디터 데모

Next.js와 Quill 에디터를 사용한 WYSIWYG 에디터 데모 프로젝트입니다.

## 주요 기능

- **리치 텍스트 편집**
  - 텍스트 서식 (굵게, 기울임, 밑줄, 취소선)
  - 제목 스타일
  - 글자 색상 및 배경색
  - 목록 (순서 있는/없는)
  - 텍스트 정렬

- **고급 편집 기능**
  - HTML 직접 편집
  - 테이블 편집
  - 비디오 삽입
  - 코드 블록
  - 실행 취소/다시 실행

- **사용자 인터페이스**
  - 모던한 UI/UX
  - Ant Design 컴포넌트 활용
  - 반응형 디자인
  - 한국어 지원

## 기술 스택

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Quill](https://quilljs.com/) - WYSIWYG 에디터
- [Ant Design](https://ant.design/) - UI 컴포넌트 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd quill_demo
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 프로젝트 구조

```
quill_demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 앱 레이아웃
│   │   └── page.tsx      # 메인 페이지
│   ├── components/
│   │   └── Editor.tsx    # Quill 에디터 컴포넌트
│   └── types/
│       └── quill-better-table.d.ts  # 타입 정의
├── public/               # 정적 파일
└── package.json         # 프로젝트 설정
```

## 사용 방법

1. **기본 텍스트 편집**
   - 툴바의 버튼을 사용하여 텍스트 서식 적용
   - 단축키 사용 가능 (Ctrl+B, Ctrl+I 등)

2. **HTML 편집**
   - HTML 버튼 클릭하여 HTML 편집 모달 열기
   - 현재 에디터 내용을 HTML로 확인/수정
   - "에디터 내용 가져오기" 버튼으로 현재 내용 가져오기

3. **테이블 편집**
   - 테이블 버튼으로 3x3 테이블 삽입
   - 테이블 셀 선택 후 컨텍스트 메뉴로 행/열 추가/삭제

4. **비디오 삽입**
   - 비디오 버튼 클릭
   - 비디오 URL 입력하여 삽입

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
