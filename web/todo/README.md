# Todo App

효율적인 할 일 관리를 위한 모던 웹 애플리케이션입니다.

## 🚀 주요 기능

- ✅ **할 일 추가/수정/삭제**: 직관적인 인터페이스로 할 일을 관리
- 🔄 **상태 토글**: 클릭 한 번으로 완료/미완료 상태 변경
- 🔍 **필터링**: 전체/진행중/완료된 할 일을 필터링하여 보기
- 💾 **로컬 저장**: 브라우저 로컬 스토리지에 데이터 자동 저장
- 📱 **반응형 디자인**: Mobile First 접근으로 모든 기기에서 최적화
- ⚡ **빠른 성능**: Vite 기반으로 빠른 개발 및 빌드

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **Icons**: Lucide React
- **State Management**: React Hooks (useReducer, useCallback, useMemo)

## 📱 Mobile First Design

이 앱은 Mobile First 접근 방식으로 설계되었습니다:

- 모바일 화면에서 최적화된 UI/UX
- 터치 친화적인 버튼 크기
- 반응형 레이아웃으로 데스크톱까지 지원
- 빠른 로딩과 부드러운 애니메이션

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── TodoInput.tsx   # 할 일 입력 컴포넌트
│   ├── TodoItem.tsx    # 할 일 아이템 컴포넌트
│   └── TodoFilter.tsx  # 필터 컴포넌트
├── hooks/              # 커스텀 훅
│   └── useTodos.ts     # Todo 상태 관리 훅
├── types/              # TypeScript 타입 정의
│   └── todo.ts         # Todo 관련 타입
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 앱 진입점
└── index.css           # 글로벌 스타일
```

## 🎨 디자인 시스템

- **색상**: Blue 계열 primary 색상 사용
- **타이포그래피**: 시스템 폰트 스택
- **스타일링**: Styled Components를 이용한 컴포넌트 기반 스타일링
- **반응형**: 미디어 쿼리를 통한 반응형 디자인
- **애니메이션**: CSS transition 효과

## 💅 Styled Components 특징

- **컴포넌트 기반 스타일링**: CSS와 컴포넌트의 통합
- **Props 기반 스타일링**: 상태에 따른 동적 스타일 적용
- **중첩 스타일 지원**: CSS 전처리기와 유사한 문법
- **테마 지원**: 일관된 디자인 시스템 관리
- **자동 벤더 프리픽스**: 브라우저 호환성 자동 처리

## 📝 코딩 표준

- 모든 파일 최상단에 생성 날짜 주석
- 모든 메소드/함수 위에 JSDoc 주석
- TypeScript 엄격 모드 사용
- React.memo를 통한 성능 최적화
- useCallback을 통한 불필요한 리렌더링 방지
- styled-components 컨벤션 준수

## 🔧 개발 환경

- Node.js 18+ 권장
- npm 또는 yarn 패키지 매니저
- 모던 브라우저 (ES2020+ 지원)

## 📄 라이선스

MIT License

---

**생성일**: 2025-05-23  
**업데이트**: 2025-05-24  
**개발자**: Todo App Team  
**버전**: 1.1.0
