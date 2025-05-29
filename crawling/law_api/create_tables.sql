-- 생성일: 2024년 5월 30일
-- PostgreSQL 15+ pgvector 확장 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- 임베딩 테이블: 판례 텍스트의 벡터 임베딩을 저장
CREATE TABLE IF NOT EXISTS law_embeddings (
    id SERIAL PRIMARY KEY,
    embedding vector(768) NOT NULL, -- 768차원 벡터 임베딩 (SentenceTransformer 'jhgan/ko-sroberta-multitask' 기준)
    source_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 법률 기본 정보 테이블
CREATE TABLE IF NOT EXISTS law_cases (
    id SERIAL PRIMARY KEY,
    embedding_id INTEGER NOT NULL REFERENCES law_embeddings(id) ON DELETE CASCADE,
    law_name VARCHAR(255) NOT NULL, -- 법령명한글
    law_id VARCHAR(50) NOT NULL, -- 법령ID
    revision_info VARCHAR(255), -- 제개정구분명 및 공포일자
    effective_date DATE, -- 시행일자
    promulgation_date DATE, -- 공포일자
    promulgation_no VARCHAR(50), -- 공포번호
    ministry VARCHAR(100), -- 소관부처명
    law_type VARCHAR(50), -- 법령구분명
    title_korean VARCHAR(255), -- 법령명한글 (중복 필드이지만 명확성을 위해 유지)
    title_abbr VARCHAR(100), -- 법령약칭명
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 법률 구분 정보 테이블
CREATE TABLE IF NOT EXISTS law_categories (
    id SERIAL PRIMARY KEY,
    gubun VARCHAR(50), -- 구분 코드 (법령구분명)
    type VARCHAR(100), -- 구분 유형 (소관부처명)
    content TEXT, -- 구분 내용
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 법률 조문 테이블
CREATE TABLE IF NOT EXISTS law_articles (
    id SERIAL PRIMARY KEY,
    law_case_id INTEGER NOT NULL REFERENCES law_cases(id) ON DELETE CASCADE,
    article_number VARCHAR(50), -- 조문번호
    article_title VARCHAR(255), -- 조문제목
    article_content TEXT, -- 조문내용
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 법률 연혁 테이블
CREATE TABLE IF NOT EXISTS law_history (
    id SERIAL PRIMARY KEY,
    law_case_id INTEGER NOT NULL REFERENCES law_cases(id) ON DELETE CASCADE,
    history_type VARCHAR(50), -- 연혁구분
    history_date DATE, -- 연혁일자
    history_no VARCHAR(50), -- 연혁번호
    history_content TEXT, -- 연혁내용
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_law_cases_law_name ON law_cases(law_name);
CREATE INDEX IF NOT EXISTS idx_law_cases_law_id ON law_cases(law_id);
CREATE INDEX IF NOT EXISTS idx_law_articles_law_case_id ON law_articles(law_case_id);
CREATE INDEX IF NOT EXISTS idx_law_history_law_case_id ON law_history(law_case_id);

-- pgvector를 위한 인덱스 생성 (유사도 검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_law_embeddings_embedding ON law_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- 갱신 트리거 함수
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 갱신 트리거 적용
CREATE TRIGGER update_law_embeddings_timestamp
BEFORE UPDATE ON law_embeddings
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_law_cases_timestamp
BEFORE UPDATE ON law_cases
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_law_categories_timestamp
BEFORE UPDATE ON law_categories
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_law_articles_timestamp
BEFORE UPDATE ON law_articles
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_law_history_timestamp
BEFORE UPDATE ON law_history
FOR EACH ROW EXECUTE FUNCTION update_timestamp(); 