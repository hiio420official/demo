# 법령 검색 시스템 (pg-mcp)

생성일: 2024년 5월 30일

## 프로젝트 개요

이 프로젝트는 한국 법제처 OPEN API를 통해 법령 데이터를 수집하고 벡터 임베딩 기반으로 검색할 수 있는 시스템입니다. 텍스트 임베딩을 사용하여 의미론적 검색을 가능하게 하며, PostgreSQL의 pgvector 확장을 활용합니다.

## 주요 기능

- 법제처 OPEN API를 통한 법령 데이터 수집
- 텍스트 의미 기반 법령 검색 (시맨틱 검색)
- 법령 데이터의 벡터화 및 저장
- 특정 법령 하나만 검색 및 저장
- 기존 법령 데이터 갱신
- 유사 법령 추천 기능
- 법령 카테고리별 분류 및 검색

## 기술 스택

- **백엔드**: FastAPI, SQLAlchemy, Pydantic
- **데이터베이스**: PostgreSQL, pgvector
- **임베딩 모델**: SentenceTransformers ('jhgan/ko-sroberta-multitask')
- **API 통신**: Requests, XML 파싱
- **배포**: Docker, Uvicorn

## 데이터베이스 구조

이 시스템은 다음과 같은 테이블 구조를 가집니다:

1. **law_cases**: 법령의 기본 정보를 저장합니다.
   - id: 기본 키
   - embedding_id: 임베딩 테이블과 연결하는 외래 키
   - law_name: 법령명(한글)
   - law_id: 법령 ID
   - revision_info: 제개정 구분명 및 공포일자
   - effective_date: 시행일자
   - promulgation_date: 공포일자
   - promulgation_no: 공포번호
   - ministry: 소관부처명
   - law_type: 법령구분명
   - title_korean: 법령명(한글)
   - title_abbr: 법령약칭명

2. **law_embeddings**: 법령 텍스트의 벡터 임베딩을 저장합니다.
   - id: 기본 키
   - embedding: 768차원 벡터 임베딩
   - source_text: 원본 텍스트

3. **law_categories**: 법령의 구분 정보를 저장합니다.
   - id: 기본 키
   - gubun: 구분 코드 (법령구분명)
   - type: 구분 유형 (소관부처명)
   - content: 구분 내용

4. **law_articles**: 법령의 조문 정보를 저장합니다.
   - id: 기본 키
   - law_case_id: 법령 ID (외래 키)
   - article_number: 조문번호
   - article_title: 조문제목
   - article_content: 조문내용

5. **law_history**: 법령의 연혁 정보를 저장합니다.
   - id: 기본 키
   - law_case_id: 법령 ID (외래 키)
   - history_type: 연혁구분
   - history_date: 연혁일자
   - history_no: 연혁번호
   - history_content: 연혁내용

## 설치 및 설정

### 요구사항

- PostgreSQL 15+ (pgvector 확장 포함)
- Python 3.8+
- Docker(선택 사항)

### 환경 설정

1. 저장소 클론:
   ```bash
   git clone https://github.com/username/pg-mcp.git
   cd pg-mcp
   ```

2. 가상 환경 설정:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -e .           # 개발 모드로 패키지 설치
   # 또는 개발 의존성을 포함하여 설치
   pip install -e ".[dev]"
   ```

3. 환경 변수 설정:
   ```bash
   cp .env.example .env
   # .env 파일을 편집하여 필요한 값 설정
   ```

### PostgreSQL 및 pgvector 설정

1. PostgreSQL 데이터베이스 설정:
   ```sql
   CREATE DATABASE precedent_db;
   ```

2. pgvector 확장 설치:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql-server-dev-15
   git clone https://github.com/pgvector/pgvector.git
   cd pgvector
   make
   make install
   
   # 데이터베이스에 확장 활성화
   psql -d precedent_db -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

3. 데이터베이스 테이블 생성:
   ```bash
   psql -U username -d precedent_db -f scripts/create_tables.sql
   ```

### Docker로 실행하기

```bash
# Docker 이미지 빌드
docker build -t pg-mcp .

# 컨테이너 실행
docker run -d --name pg-mcp-app -p 8000:8000 --env-file .env pg-mcp
```

## 사용 방법

### 법령 데이터 수집

법령 데이터를 수집하는 명령은 다음과 같습니다:

```bash
# CLI 모드로 실행
law-api

# 또는 직접 스크립트 실행
python -m pg_mcp.scripts.fetch_law_api
```

실행 시 다음과 같은 메뉴가 제공됩니다:

1. 키워드로 법령 검색 및 저장
2. 특정 법령 하나만 가져오기
3. 전체 법령 가져오기
4. 기존 데이터 갱신

### API 서버 실행

```bash
uvicorn pg_mcp.api.main:app --reload
```

API 문서는 http://localhost:8000/docs에서 확인할 수 있습니다.

### 검색 예시

#### Python 코드 예시

```python
from pg_mcp.database import get_precedent
from pg_mcp.embeddings import get_embedding

# 쿼리 텍스트 임베딩 생성
query_text = "임대차 계약 갱신 거절 사유"
embedding = get_embedding(query_text)

# 유사한 법령 검색
results = get_precedent(embedding, limit=5)
for result in results:
    print(f"법령명: {result.law_name}")
    print(f"소관부처: {result.ministry}")
    print(f"시행일자: {result.effective_date}")
    print(f"유사도: {result.similarity:.4f}")
    print("---")
```

#### API 호출 예시

```bash
curl -X POST "http://localhost:8000/api/search" \
  -H "Content-Type: application/json" \
  -d '{"query": "임대차 계약 갱신 거절 사유", "limit": 5}'
```

## 법제처 OPEN API 활용

이 프로젝트는 법제처에서 제공하는 OPEN API를 활용합니다. API를 사용하기 위해서는 법제처에 이메일 주소를 등록해야 합니다.

### API 기본 URL
```
http://www.law.go.kr/DRF/lawSearch.do
```

### 주요 API 파라미터

- OC: API 요청 이메일 ID (g4c@korea.kr일 경우 OC값=g4c)
- target: 검색 대상 (law)
- type: 응답 형식 (XML, JSON, HTML)
- query: 검색어
- display: 검색 결과 개수 (최대 100)
- page: 결과 페이지
- sort: 정렬 방식 (lasc)

## 개발 가이드

### 코드 품질 관리

```bash
# 코드 포맷팅
black pg_mcp

# 임포트 정렬
isort pg_mcp

# 타입 체크
mypy pg_mcp

# 린팅
flake8 pg_mcp

# 테스트 실행
pytest
```

### 프로젝트 구조

```
pg-mcp/
├── pg_mcp/                # 소스 코드
│   ├── api/               # API 엔드포인트
│   ├── database/          # 데이터베이스 모델 및 쿼리
│   ├── embeddings/        # 임베딩 생성 및 관리
│   ├── scripts/           # 유틸리티 스크립트
│   │   └── fetch_law_api.py  # 법령 데이터 수집 스크립트
│   └── utils/             # 유틸리티 함수
├── tests/                 # 테스트 코드
├── docker/                # Docker 관련 파일
├── scripts/               # 설치 및 배포 스크립트
│   └── create_tables.sql  # 테이블 생성 SQL 스크립트
├── .env.example           # 환경 변수 예시
├── pyproject.toml         # 프로젝트 구성
├── README.md              # 프로젝트 문서
└── LICENCE                # 라이센스 정보
```

## 기여 방법

1. 프로젝트를 포크하고 기능 브랜치를 생성합니다.
2. 변경사항을 커밋하고 테스트합니다.
3. 브랜치에 변경사항을 푸시합니다.
4. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 주의사항

- 대용량 데이터 처리 시 충분한 메모리와 디스크 공간이 필요합니다.
- 임베딩 생성은 컴퓨팅 리소스를 많이 사용할 수 있습니다.
- 법제처 OPEN API는 요청 제한이 있을 수 있으므로 과도한 요청을 피해야 합니다.
- 법령 원문 데이터는 저작권법을 준수하여 사용해야 합니다.
