<!-- 
파일 생성일: 2024-12-21
작성자: AI Assistant
파일 목적: ChatGPT 프로젝트 전체 개요 및 가이드
-->

# 🤖 ChatGPT 프로젝트 

> **세계 최초 완전 자동화 AI LLM CHAT 시뮬레이션 시스템**  
> React + NestJS + OpenAI 기반의 풀스택 AI 채팅 플랫폼

**🔗 GitHub Repository**: [https://github.com/hiio420official/llmchat](https://github.com/hiio420official/llmchat)

[![GitHub stars](https://img.shields.io/github/stars/hiio420official/llmchat)](https://github.com/hiio420official/llmchat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)

## 📑 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 특징](#-주요-특징)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 설정](#-설치-및-설정)
- [실행 방법](#-실행-방법)
- [사용 방법](#-사용-방법)
- [API 문서](#-api-문서)
- [개발 가이드](#-개발-가이드)
- [배포](#-배포)
- [보안](#-보안)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

## 🚀 프로젝트 개요

ChatGPT 프로젝트는 OpenAI의 GPT 모델을 활용한 혁신적인 AI LLM CHAT 시뮬레이션 시스템입니다. 
완전 자동화된 턴 기반 시스템으로 피고측 변호사, 원고측 검사, 판사 AI가 자동으로 LLM CHAT을 진행하며, 
사용자는 필요한 순간에만 참여할 수 있습니다.

### 🎯 프로젝트 목표

- **교육적 가치**: LLM CHAT 절차에 대한 이해도 향상
- **접근성**: 누구나 쉽게 LLM CHAT 시뮬레이션 체험 가능
- **실시간성**: 50ms 이하 지연으로 생생한 경험 제공
- **확장성**: 다양한 AI 시나리오로 확장 가능

## ✨ 주요 특징

### 🔄 완전 자동화 시스템
- AI들이 스스로 판단하여 done이 될 때까지 자동 진행
- 사용자 개입 없이도 완전한 LLM CHAT 시뮬레이션 진행

### ⚖️ LLM CHAT 시뮬레이션
- **a1 (원고측)**: 빨간색, 왼쪽 정렬, ⚖️ 아이콘
- **a2 (피고측)**: 파란색, 오른쪽 정렬, 🛡️ 아이콘  
- **a3 (재판장)**: 초록색, 중앙 정렬, 👨‍⚖️ 아이콘
- **a4 (사용자)**: 보라색, 중앙 정렬, ✍️ 아이콘

### 🎯 지능적 턴 관리
- AI가 적절한 대화 길이를 스스로 결정
- 상황에 따른 유연한 턴 진행

### ⚡ 실시간 스트리밍
- WebSocket 기반 실시간 통신
- 50ms 이하 지연으로 자연스러운 대화

### 📱 Mobile First Design
- 모바일과 데스크톱 모두 완벽 지원
- 터치 친화적 UI/UX
- 반응형 레이아웃

## 🛠️ 기술 스택

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4.1.8
- **Communication**: Socket.io-client
- **Markdown**: React Markdown + Syntax Highlighting
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS + TypeScript
- **AI**: OpenAI GPT-4o-mini
- **Database**: Prisma ORM + SQLite
- **WebSocket**: Socket.IO
- **Documentation**: Swagger/OpenAPI
- **Process Manager**: PM2

### DevOps & Tools
- **Build**: Vite (Frontend), TypeScript (Backend)
- **Linting**: ESLint + Prettier
- **Version Control**: Git
- **Package Manager**: npm

## 📁 프로젝트 구조

```
📦 ChatGPT Project
├── 📁 front/                    # React 프론트엔드
│   ├── 📁 src/
│   │   ├── 📁 components/       # React 컴포넌트
│   │   ├── App.tsx             # 메인 애플리케이션
│   │   └── main.tsx            # 엔트리 포인트
│   ├── package.json            # 프론트엔드 의존성
│   ├── vite.config.ts          # Vite 설정
│   └── README.md               # 프론트엔드 가이드
│
├── 📁 server/                   # NestJS 백엔드
│   ├── 📁 src/
│   │   ├── 📁 ai/              # AI 관련 모듈
│   │   ├── 📁 users/           # 사용자 관리
│   │   ├── 📁 auth/            # 인증 시스템
│   │   └── main.ts             # 애플리케이션 진입점
│   ├── 📁 prisma/              # 데이터베이스 스키마
│   ├── package.json            # 백엔드 의존성
│   ├── ecosystem.config.js     # PM2 설정
│   └── README.md               # 백엔드 가이드
│
└── README.md                   # 이 파일
```

## 📦 설치 및 설정

### 1. 저장소 클론
```bash
git clone https://github.com/hiio420official/llmchat.git
cd llmchat
```

### 2. 백엔드 설정
```bash
cd server
npm install

# 환경변수 설정
cp environment.example .env
# .env 파일을 수정하여 실제 값들을 설정하세요

# 데이터베이스 설정
npx prisma generate
npx prisma db push
```

### 3. 프론트엔드 설정
```bash
cd ../front
npm install

# 환경변수 설정 (선택사항)
# .env 파일을 생성하여 API URL을 설정할 수 있습니다
```

### 4. 환경변수 설정

#### 백엔드 (.env)
```env
# 데이터베이스 설정
DATABASE_URL="file:./dev.db"

# OpenAI API 설정 (필수)
OPENAI_API_KEY="your_openai_api_key_here"
DEFAULT_MODEL="gpt-4o-mini"

# 서버 설정
PORT=3000
NODE_ENV=development

# CORS 설정
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
WEBSOCKET_CORS_ORIGINS="http://localhost:5173,http://localhost:5000"
```

#### 프론트엔드 (.env) - 선택사항
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_NODE_ENV=development
```

## 🚀 실행 방법

### 개발 모드

**1. 백엔드 서버 실행**
```bash
cd server
npm run start:dev
```

**2. 프론트엔드 서버 실행**
```bash
cd front
npm run dev
```

**3. 브라우저에서 접속**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API 문서: http://localhost:3000/api

### 프로덕션 모드

**백엔드**
```bash
cd server
npm run build
npm run start:prod

# 또는 PM2 사용
pm2 start ecosystem.config.js --env production
```

**프론트엔드**
```bash
cd front
npm run build
# dist/ 폴더를 웹서버에 배포
```

## 🎮 사용 방법

### 1. LLM CHAT 시뮬레이션 시작
```
계약 위반 손해배상 청구 사건에 대한 LLM CHAT 시뮬레이션을 시작해주세요
```

### 2. 자동 진행 관람
- AI들이 자동으로 LLM CHAT을 진행하는 것을 관람
- 각 턴별로 색상과 위치가 다르게 표시

### 3. 사용자 참여
- a4 턴에서 사용자 발언 기회 제공
- 시뮬레이션 완료 후 일반 채팅 모드로 전환

### 4. 일반 채팅
- GPT와 자유로운 대화
- 실시간 스트리밍 응답

## 📡 API 문서

서버 실행 후 다음 URL에서 Swagger API 문서를 확인할 수 있습니다:

```
http://localhost:3000/api
```

### 주요 API 엔드포인트

- `GET /chat` - 채팅방 목록 조회
- `POST /chat` - 새 채팅방 생성
- `GET /chat/:id/messages` - 채팅 메시지 조회
- `POST /ai/chat` - AI 채팅 요청
- WebSocket `/` - 실시간 통신

## 👨‍💻 개발 가이드

### 코딩 컨벤션
- **주석**: 모든 메소드 위에 JSDoc 주석 작성
- **타입**: TypeScript 엄격 모드 사용
- **네이밍**: camelCase 사용
- **파일 구조**: 기능별 모듈 분리

### 주석 작성 규칙
```typescript
/**
 * 채팅 메시지를 생성합니다
 * @param chatId - 채팅방 ID
 * @param content - 메시지 내용
 * @param type - 메시지 타입 ('user' | 'assistant' | 'system')
 * @returns 생성된 메시지 객체
 */
async createMessage(chatId: string, content: string, type: MessageType): Promise<Message> {
  // 구현 내용
}
```

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `hotfix/*`: 긴급 수정 브랜치

## 🌍 배포

### 백엔드 배포
자세한 배포 방법은 [server/deployment_guide.md](./server/deployment_guide.md)를 참고하세요.

### 프론트엔드 배포
```bash
# 빌드
npm run build

# 정적 파일 서버에 dist/ 폴더 업로드
# 예: Netlify, Vercel, AWS S3 등
```

## 🔐 보안

### 환경변수 관리
- ❌ **절대로 `.env` 파일을 GitHub에 커밋하지 마세요**
- ✅ `environment.example` 파일만 참고용으로 제공
- ✅ 프로덕션에서는 별도의 환경변수 관리 시스템 사용

### API 키 보안
- OpenAI API 키는 반드시 환경변수로 관리
- API 키에 적절한 사용 제한 설정
- 정기적인 키 로테이션 권장

### 데이터베이스 보안
- SQLite 파일은 `.gitignore`에 포함됨
- 프로덕션에서는 PostgreSQL 등 안전한 DB 사용 권장

## 📚 추가 문서

- [서버 기능 명세서](./server/기능.md)
- [ERD 문서](./server/erd.md)
- [테스팅 가이드](./server/testing_guide.md)
- [클라이언트 매뉴얼](./server/client_manual.md)
- [배포 가이드](./server/deployment_guide.md)

## 🤝 기여하기

1. **Fork** 프로젝트
2. **Feature Branch** 생성 (`git checkout -b feature/AmazingFeature`)
3. **Commit** 변경사항 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to Branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** 생성

### 기여 가이드라인
- 코드 작성 전 이슈 생성 및 논의
- 테스트 코드 작성
- 커밋 메시지는 영어로 작성
- PR 작성 시 변경사항 상세 설명

## 🐛 버그 리포트

버그를 발견하셨나요? [Issues](https://github.com/hiio420official/llmchat/issues)에 다음 정보와 함께 리포트해주세요:

- 운영체제 및 브라우저 정보
- 재현 가능한 단계
- 예상 결과 vs 실제 결과
- 스크린샷 (가능한 경우)

## ⚠️ 주의사항

- 이 프로젝트는 교육 및 연구 목적으로 개발되었습니다
- 실제 법적 조언을 대체할 수 없습니다
- OpenAI API 사용료가 발생할 수 있습니다
- 상업적 이용 시 라이선스를 확인하세요

## 📞 지원 및 문의

- **GitHub Issues**: [프로젝트 이슈](https://github.com/hiio420official/llmchat/issues)
- **GitHub Discussions**: [GitHub Discussions](https://github.com/hiio420official/llmchat/discussions)
- **이메일**: hiio420official@gmail.com

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. [LICENSE](LICENSE) 파일을 참고하세요.

## 🙏 감사의 말

- [OpenAI](https://openai.com/) - GPT API 제공
- [NestJS](https://nestjs.com/) - 뛰어난 백엔드 프레임워크
- [React](https://reactjs.org/) - 강력한 프론트엔드 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) - 아름다운 스타일링
- 모든 오픈소스 기여자들

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되셨다면 스타를 눌러주세요! ⭐**

Made with ❤️ by [hiio420official](https://github.com/hiio420official)

</div>
