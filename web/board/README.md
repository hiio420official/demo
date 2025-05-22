# 게시판 애플리케이션 데모

더미 데이터를 활용한 React 기반 게시판 애플리케이션입니다. 게시글 목록 조회, 게시글 상세 보기, 게시글 작성/수정 등의 기능을 제공합니다.

## 프로젝트 소개

이 프로젝트는 React와 TypeScript를 사용하여 개발된 게시판 애플리케이션입니다. 실제 백엔드 연동 없이 더미 데이터를 활용하여 프론트엔드 기능을 구현했습니다.

### 주요 기능

- **게시글 목록 조회**: 페이지네이션을 통한 게시글 목록 탐색
- **게시글 상세 보기**: 게시글 내용, 작성자, 작성일, 조회수 등의 정보 표시
- **게시글 작성/수정**: 새 게시글 작성 및 기존 게시글 수정
- **반응형 디자인**: 모바일부터 데스크톱까지 다양한 디바이스에서 최적화된 UI

## 기술 스택

- React 19
- TypeScript
- styled-components (CSS-in-JS)
- React Router (라우팅)

## 설치 및 실행 방법

### 필수 요구사항

- Node.js 18.0 이상
- npm 9.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/hiio420official/demo.git

# 프로젝트 디렉토리로 이동
cd demo/web/board

# 의존성 패키지 설치
npm install
```

### 실행

```bash
# 개발 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── BoardList.tsx # 게시판 목록 컴포넌트
│   ├── Header.tsx    # 헤더 컴포넌트
│   ├── Layout.tsx    # 레이아웃 컴포넌트
│   └── PostDetail.tsx # 게시글 상세 컴포넌트
├── data/
│   └── boardData.ts  # 더미 데이터 및 타입 정의
├── pages/            # 페이지 컴포넌트
│   ├── BoardPage.tsx # 게시판 목록 페이지
│   ├── HomePage.tsx  # 홈 페이지
│   ├── PostDetailPage.tsx # 게시글 상세 페이지
│   └── PostFormPage.tsx   # 게시글 작성/수정 페이지
├── styles/           # 스타일 관련 파일
│   ├── GlobalStyles.ts # 전역 스타일
│   └── Theme.ts      # 테마 설정
├── types/            # 타입 정의
│   └── styled.d.ts   # styled-components 타입 확장
├── App.tsx           # 앱 진입점 및 라우팅 설정
└── index.tsx         # React 렌더링 설정
```

## 빌드

```bash
# 프로덕션용 빌드
npm run build
```

빌드된 파일은 `build` 디렉토리에 생성됩니다. 이 파일들은 정적 웹 서버를 통해 배포할 수 있습니다.

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
