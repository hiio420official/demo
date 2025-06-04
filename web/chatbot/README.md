# 🤖 AI 챗봇 UI

**파일 생성 날짜: 2025-01-26**

Modern하고 반응형인 챗봇 사용자 인터페이스입니다. Mobile First 디자인으로 제작되어 모바일과 데스크톱 모두에서 최적화된 경험을 제공합니다.

## ✨ 주요 기능

- 🎨 **Modern UI/UX**: 그라데이션과 애니메이션이 적용된 현대적인 디자인
- 📱 **Mobile First**: 모바일 우선 반응형 디자인으로 모든 기기에서 최적화
- ⚡ **Fast Performance**: React 19 + TypeScript + Vite를 사용한 빠른 성능
- 💬 **실시간 채팅**: 실시간 메시지 전송 및 응답 시뮬레이션
- 🕒 **타임스탬프**: 각 메시지에 시간 표시
- 🎯 **빠른 응답**: 미리 정의된 빠른 응답 버튼
- 🔄 **로딩 인디케이터**: 봇 응답 대기 중 애니메이션
- 🧹 **입력 필드 클리어**: 입력 내용 쉽게 삭제 가능
- 📜 **자동 스크롤**: 새 메시지 시 자동으로 스크롤

## 🛠 기술 스택

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.1.8
- **Build Tool**: Vite 6.3.5
- **Package Manager**: npm
- **Development**: ESLint + Hot Module Replacement

## 🚀 설치 및 실행

### 전제 조건
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 서버 시작 (기본 포트: 5173)
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview
```

## 📱 UI 구성 요소

### 헤더
- AI 챗봇 아이콘과 제목
- 온라인 상태 표시

### 메시지 영역
- 사용자와 봇 메시지 구분 표시
- 타임스탬프 포함
- 자동 스크롤 기능
- 로딩 인디케이터

### 입력 영역
- 원형 입력 필드
- 전송 버튼 (아이콘)
- 입력 내용 삭제 버튼
- 빠른 응답 버튼들

## 🎨 디자인 특징

### 반응형 디자인
- **모바일 (< 768px)**: 전체 화면 레이아웃
- **태블릿/데스크톱 (≥ 768px)**: 카드 형태 레이아웃

### 색상 테마
- **Primary**: Blue (500-600) to Indigo (600) gradient
- **Background**: Blue (50) to Indigo (100) gradient
- **Cards**: White background with shadows
- **Text**: Gray scale for optimal readability

### 애니메이션
- 부드러운 transition 효과
- 로딩 인디케이터 bounce 애니메이션
- 호버 효과와 transform

## 🔧 커스터마이징

### 메시지 타입 확장
```typescript
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  // 추가 필드들...
}
```

### 스타일 커스터마이징
Tailwind CSS 클래스를 수정하여 디자인을 변경할 수 있습니다.

### API 연동
현재는 시뮬레이션된 응답을 사용하지만, `sendMessage` 함수를 수정하여 실제 API와 연동할 수 있습니다.

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

---

**Made with ❤️ using React + TypeScript + Tailwind CSS**
