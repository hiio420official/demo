# 생성일: 2025년 5월 29일
import requests
import xml.etree.ElementTree as ET
import os
import psycopg2
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import time
import re

# .env 파일에서 환경변수 로드
load_dotenv()

# PostgreSQL 데이터베이스에 연결
database_url = os.getenv("DATABASE_URL")

# 법제처 OPEN API 기본 URL
BASE_URL = "http://www.law.go.kr/DRF/lawSearch.do"

# API 요청 이메일 ID (g4c@korea.kr일 경우 OC값=g4c)
API_EMAIL_ID = os.getenv("LAW_API_EMAIL_ID")  

# 법령 데이터 가져오기
def fetch_law_data(query=None, display=20, page=1, sort="lasc", type_format="XML"):
    """
    법제처 OPEN API를 통해 법령 데이터를 가져옵니다.
    
    Args:
        query (str, optional): 검색어
        display (int, optional): 검색 결과 개수 (최대 100)
        page (int, optional): 결과 페이지
        sort (str, optional): 정렬 방식
        type_format (str, optional): 응답 형식 (XML, JSON, HTML)
        
    Returns:
        dict: 법령 데이터
    """
    params = {
        "OC": API_EMAIL_ID,
        "target": "law",
        "type": type_format
    }
    
    # 선택적 파라미터 추가
    if query:
        params["query"] = query
    
    params["display"] = min(display, 100)  # 최대 100개로 제한
    params["page"] = page
    params["sort"] = sort
    
    try:
        print(f"법령 데이터 요청 중: {BASE_URL}")
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # 에러 발생 시 예외 발생
        
        if type_format.upper() == "XML":
            return parse_xml_response(response.text)
        elif type_format.upper() == "JSON":
            return response.json()
        else:
            return response.text
    
    except requests.exceptions.RequestException as e:
        print(f"API 요청 중 오류 발생: {str(e)}")
        return None

def parse_xml_response(xml_text):
    """
    XML 응답을 파싱하여 Python 딕셔너리로 변환합니다.
    
    Args:
        xml_text (str): XML 형식의 응답 문자열
        
    Returns:
        dict: 파싱된 데이터
    """
    try:
        root = ET.fromstring(xml_text)
        result = {
            "target": root.findtext("target") or "",
            "keyword": root.findtext("keyword") or "",
            "totalCnt": int(root.findtext("totalCnt") or 0),
            "page": int(root.findtext("page") or 1),
            "laws": []
        }
        
        # 법령 목록 파싱
        for law in root.findall(".//law"):
            law_data = {}
            for child in law:
                if child.tag and child.text:
                    law_data[child.tag] = child.text
            
            result["laws"].append(law_data)
        
        return result
    
    except Exception as e:
        print(f"XML 파싱 중 오류 발생: {str(e)}")
        return None

# 법령 상세 정보 가져오기
def fetch_law_detail(law_id):
    """
    특정 법령의 상세 정보를 가져옵니다.
    
    Args:
        law_id (str): 법령 ID
        
    Returns:
        dict: 법령 상세 정보
    """
    params = {
        "OC": API_EMAIL_ID,
        "target": "law",
        "type": "XML",
        "MST": law_id
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        
        return parse_law_detail_xml(response.text)
    
    except requests.exceptions.RequestException as e:
        print(f"API 요청 중 오류 발생: {str(e)}")
        return None

def parse_law_detail_xml(xml_text):
    """
    법령 상세 정보 XML을 파싱합니다.
    
    Args:
        xml_text (str): XML 형식의 응답 문자열
        
    Returns:
        dict: 파싱된 법령 상세 정보
    """
    try:
        root = ET.fromstring(xml_text)
        
        # 기본 정보
        law_info = {}
        for elem in root.findall('./기본정보/*'):
            if elem.tag and elem.text:
                law_info[elem.tag] = elem.text
        
        # 조문 정보
        articles = []
        for article_elem in root.findall('./조문'):
            article = {}
            article_num = article_elem.findtext('조문번호') or ""
            article_title = article_elem.findtext('조문제목') or ""
            article_content = article_elem.findtext('조문내용') or ""
            
            # HTML 태그 제거
            article_content = re.sub(r'<[^>]+>', '', article_content)
            
            article['조문번호'] = article_num
            article['조문제목'] = article_title
            article['조문내용'] = article_content
            
            articles.append(article)
        
        # 연혁 정보 파싱
        history = []
        for history_elem in root.findall('./연혁'):
            history_item = {}
            for child in history_elem:
                if child.tag and child.text:
                    history_item[child.tag] = child.text
            if history_item:
                history.append(history_item)
        
        return {
            "기본정보": law_info,
            "조문들": articles,
            "연혁": history
        }
    
    except Exception as e:
        print(f"법령 상세 XML 파싱 중 오류 발생: {str(e)}")
        return None

# 이미 존재하는 법률인지 확인하는 함수
def check_law_exists(law_name, law_id=None):
    """
    이미 존재하는 법률인지 확인합니다.
    
    Args:
        law_name (str): 법령명
        law_id (str, optional): 법령 ID
        
    Returns:
        tuple: (존재 여부, 법률 ID, 저장 일자)
    """
    try:
        with psycopg2.connect(database_url) as conn:
            with conn.cursor() as cur:
                if law_id:
                    cur.execute(
                        """
                        SELECT id, law_name, created_at, updated_at 
                        FROM law_cases 
                        WHERE law_name = %s OR law_id = %s
                        """,
                        (law_name, law_id)
                    )
                else:
                    cur.execute(
                        """
                        SELECT id, law_name, created_at, updated_at 
                        FROM law_cases 
                        WHERE law_name = %s
                        """,
                        (law_name,)
                    )
                
                result = cur.fetchone()
                if result:
                    return True, result[0], result[2]  # 존재함, ID, 생성일자
                return False, None, None  # 존재하지 않음
    except Exception as e:
        print(f"법률 존재 여부 확인 중 오류 발생: {str(e)}")
        return False, None, None

# 법령 검색 및 저장
def search_and_save_laws(keyword=None, max_laws=100, update_existing=False):
    """
    법령을 검색하고 데이터베이스에 저장합니다.
    
    Args:
        keyword (str, optional): 검색 키워드
        max_laws (int, optional): 최대 저장할 법령 수
        update_existing (bool, optional): 이미 존재하는 법령 갱신 여부
        
    Returns:
        tuple: (저장된 법령 수, 건너뛴 법령 수)
    """
    # 임베딩 모델 로드
    model = SentenceTransformer('jhgan/ko-sroberta-multitask')
    
    saved_count = 0
    skipped_count = 0
    updated_count = 0
    page = 1
    display = min(max_laws, 100)
    
    while saved_count + updated_count < max_laws:
        # 법령 목록 가져오기
        result = fetch_law_data(query=keyword, display=display, page=page)
        
        if not result or not result.get("laws"):
            print("더 이상 검색 결과가 없습니다.")
            break
        
        laws = result.get("laws", [])
        print(f"검색 결과: {len(laws)}개의 법령을 찾았습니다.")
        
        for law in laws:
            if saved_count + updated_count >= max_laws:
                break
            
            try:
                # 법령 상세 정보 가져오기
                law_id = law.get("법령ID")
                if not law_id:
                    continue
                
                law_name = law.get("법령명한글", "")
                
                # 이미 저장된 법령인지 확인
                exists, existing_id, created_at = check_law_exists(law_name, law_id)
                
                if exists:
                    if update_existing:
                        print(f"갱신: {law_name} - 기존 항목({created_at})을 갱신합니다.")
                        # 기존 데이터 삭제 후 재저장
                        delete_law(existing_id)
                    else:
                        print(f"건너뜀: {law_name} - 이미 데이터베이스에 존재합니다 (저장일: {created_at}).")
                        skipped_count += 1
                        continue
                
                print(f"처리 중: {law_name}")
                
                # 법령 상세 정보 요청
                law_detail = fetch_law_detail(law_id)
                if not law_detail:
                    continue
                
                # 법령 정보 저장
                if save_law_to_database(law, law_detail, model):
                    if exists and update_existing:
                        updated_count += 1
                        print(f"갱신 완료: {law_name} (총 {saved_count}개 저장, {updated_count}개 갱신)")
                    else:
                        saved_count += 1
                        print(f"저장 완료: {law_name} (총 {saved_count}개 저장, {updated_count}개 갱신)")
                
                # API 호출 제한 방지를 위한 지연
                time.sleep(1)
            
            except Exception as e:
                print(f"법령 저장 중 오류 발생: {str(e)}")
        
        # 다음 페이지 요청
        page += 1
        
        # 더 이상 결과가 없으면 종료
        if len(laws) < display:
            break
    
    print(f"\n=== 처리 결과 ===")
    print(f"총 {saved_count}개의 새 법령 데이터 저장")
    print(f"총 {updated_count}개의 기존 법령 데이터 갱신")
    print(f"총 {skipped_count}개의 법령 건너뜀 (중복)")
    
    return saved_count, skipped_count, updated_count

# 법령 삭제 함수 추가
def delete_law(law_id):
    """
    데이터베이스에서 법령을 삭제합니다.
    
    Args:
        law_id (int): 법률 ID
        
    Returns:
        bool: 성공 여부
    """
    try:
        with psycopg2.connect(database_url) as conn:
            with conn.cursor() as cur:
                # CASCADE 옵션으로 인해 관련 데이터도 함께 삭제됨
                cur.execute("DELETE FROM law_cases WHERE id = %s", (law_id,))
                conn.commit()
                return True
    except Exception as e:
        print(f"법령 삭제 중 오류 발생: {str(e)}")
        return False

# 날짜 문자열을 PostgreSQL 호환 형식으로 변환
def format_date(date_str):
    if not date_str:
        return None
    
    date_str = date_str.strip()
    
    try:
        # 8자리 숫자 형태의 날짜 처리 (예: 20220315)
        if date_str.isdigit() and len(date_str) == 8:
            return f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
        
        return None
    except Exception:
        return None

# 임베딩 생성
def create_embedding(model, text):
    embedding = model.encode(text)
    embedding_list = [float(x) for x in embedding]
    return embedding_list

# 법령 정보를 데이터베이스에 저장
def save_law_to_database(law, law_detail, model):
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        with conn.cursor() as cur:
            # 법령 기본 정보
            law_name = law.get("법령명한글", "")
            law_id = law.get("법령ID", "")
            revision_info = f"{law.get('제개정구분명', '')} ({law.get('공포일자', '')})"
            effective_date = format_date(law.get("시행일자"))
            promulgation_date = format_date(law.get("공포일자"))
            promulgation_no = law.get("공포번호", "")
            ministry = law.get("소관부처명", "")
            law_type = law.get("법령구분명", "")
            title_korean = law.get("법령명한글", "")
            title_abbr = law.get("법령약칭명", "")
            
            # 법령 전체 내용 텍스트 생성 (임베딩용)
            law_text = f"{law_name} {revision_info} "
            
            # 조문 내용 추가
            articles = law_detail.get("조문들", [])
            for article in articles:
                law_text += f"{article.get('조문번호', '')} {article.get('조문제목', '')} {article.get('조문내용', '')} "
            
            # 임베딩 생성
            embedding = create_embedding(model, law_text)
            
            # 임베딩 저장
            cur.execute(
                "INSERT INTO law_embeddings (embedding, source_text) VALUES (%s::vector, %s) RETURNING id",
                (embedding, law_text)
            )
            embedding_id = cur.fetchone()[0]
            
            # 법률 정보 저장
            cur.execute(
                """
                INSERT INTO law_cases 
                (embedding_id, law_name, law_id, revision_info, effective_date, 
                promulgation_date, promulgation_no, ministry, law_type, title_korean, title_abbr)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (
                    embedding_id,
                    law_name,
                    law_id,
                    revision_info,
                    effective_date,
                    promulgation_date,
                    promulgation_no,
                    ministry,
                    law_type,
                    title_korean,
                    title_abbr
                )
            )
            law_id = cur.fetchone()[0]
            
            # 법률 구분 정보 저장
            cur.execute(
                """
                INSERT INTO law_categories
                (gubun, type, content)
                VALUES (%s, %s, %s)
                """,
                (
                    law.get("법령구분명", ""),
                    law.get("소관부처명", ""),
                    f"공포번호: {law.get('공포번호', '')}, 공포일자: {law.get('공포일자', '')}"
                )
            )
            
            # 조문 정보 저장
            for article in articles:
                article_number = article.get('조문번호', '')
                article_title = article.get('조문제목', '')
                article_content = article.get('조문내용', '')
                
                # 제목이 있으면 제목과 내용을 합침
                if article_title:
                    full_content = article_content
                else:
                    full_content = article_content
                
                cur.execute(
                    """
                    INSERT INTO law_articles
                    (law_case_id, article_number, article_title, article_content)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    (law_id, article_number, article_title, full_content)
                )
                
                article_id = cur.fetchone()[0]
                
                # 해설 정보는 별도로 추가해야 할 경우 여기에 작성
                # (API에서 해당 정보를 제공하는 경우)
            
            # 연혁 정보 저장
            for history_item in law_detail.get("연혁", []):
                history_type = history_item.get("연혁구분", "")
                history_date = format_date(history_item.get("연혁일자", ""))
                history_no = history_item.get("연혁번호", "")
                history_content = history_item.get("연혁내용", "")
                
                if history_date:  # 날짜가 있는 경우만 저장
                    cur.execute(
                        """
                        INSERT INTO law_history
                        (law_case_id, history_type, history_date, history_no, history_content)
                        VALUES (%s, %s, %s, %s, %s)
                        """,
                        (law_id, history_type, history_date, history_no, history_content)
                    )
            
            # 변경 내용 커밋
            conn.commit()
            return True
    
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"데이터베이스 저장 중 오류 발생: {str(e)}")
        return False
    finally:
        if conn:
            conn.close()

# 특정 법령 하나만 가져오기
def fetch_single_law(law_name, update_existing=False):
    """
    특정 법령 하나만 가져와서 저장합니다.
    
    Args:
        law_name (str): 법령명
        update_existing (bool, optional): 이미 존재하는 법령 갱신 여부
        
    Returns:
        bool: 성공 여부
    """
    # 임베딩 모델 로드
    model = SentenceTransformer('jhgan/ko-sroberta-multitask')
    
    # 이미 저장된 법령인지 확인
    exists, existing_id, created_at = check_law_exists(law_name)
    
    if exists:
        if update_existing:
            print(f"갱신: {law_name} - 기존 항목({created_at})을 갱신합니다.")
            # 기존 데이터 삭제
            delete_law(existing_id)
        else:
            print(f"건너뜀: {law_name} - 이미 데이터베이스에 존재합니다 (저장일: {created_at}).")
            return False
    
    # 법령 목록 가져오기
    result = fetch_law_data(query=law_name, display=10, page=1)
    
    if not result or not result.get("laws"):
        print(f"법령을 찾을 수 없습니다: {law_name}")
        return False
    
    # 정확한 법령명 찾기
    found_law = None
    for law in result.get("laws", []):
        if law.get("법령명한글") == law_name:
            found_law = law
            break
    
    if not found_law:
        print(f"정확한 법령명과 일치하는 법령을 찾을 수 없습니다: {law_name}")
        # 비슷한 법령명 제안
        print("유사한 법령명:")
        for idx, law in enumerate(result.get("laws", [])[:5]):
            print(f"  {idx+1}. {law.get('법령명한글', '')}")
        return False
    
    try:
        # 법령 상세 정보 가져오기
        law_id = found_law.get("법령ID")
        if not law_id:
            return False
        
        print(f"처리 중: {law_name}")
        
        # 법령 상세 정보 요청
        law_detail = fetch_law_detail(law_id)
        if not law_detail:
            return False
        
        # 법령 정보 저장
        if save_law_to_database(found_law, law_detail, model):
            print(f"저장 완료: {law_name}")
            return True
        else:
            return False
    
    except Exception as e:
        print(f"법령 저장 중 오류 발생: {str(e)}")
        return False

# 메인 함수
def main():
    print("법제처 OPEN API를 통한 법령 데이터 수집을 시작합니다.")
    
    # 메뉴 선택
    print("\n1. 키워드로 법령 검색 및 저장")
    print("2. 특정 법령 하나만 가져오기")
    print("3. 전체 법령 가져오기")
    print("4. 기존 데이터 갱신")
    
    choice = input("\n작업을 선택하세요 (1-4): ")
    
    # 중복 법령 처리 방식 선택
    update_existing = False
    if choice in ["1", "2", "3", "4"]:
        update_option = input("이미 존재하는 법령을 갱신하시겠습니까? (y/n, 기본값: n): ").lower()
        update_existing = update_option.startswith("y")
    
    if choice == "1":
        # 검색어 입력
        keyword = input("검색할 법령 키워드를 입력하세요: ")
        if not keyword:
            print("키워드를 입력해야 합니다.")
            return
        
        # 최대 가져올 법령 수 입력
        try:
            max_laws = int(input("최대 몇 개의 법령을 가져올까요? (기본값: 20): ") or "20")
        except ValueError:
            max_laws = 20
        
        # 법령 검색 및 저장
        saved_count, skipped_count, updated_count = search_and_save_laws(
            keyword=keyword, 
            max_laws=max_laws, 
            update_existing=update_existing
        )
        print(f"처리 완료: {saved_count}개 저장, {updated_count}개 갱신, {skipped_count}개 건너뜀")
    
    elif choice == "2":
        # 특정 법령 이름 입력
        law_name = input("가져올 법령의 정확한 이름을 입력하세요: ")
        if not law_name:
            print("법령 이름을 입력해야 합니다.")
            return
        
        # 특정 법령 가져오기
        if fetch_single_law(law_name, update_existing=update_existing):
            print("법령을 성공적으로 가져왔습니다.")
        else:
            print("법령을 가져오는데 실패했습니다.")
    
    elif choice == "3":
        # 최대 가져올 법령 수 입력
        try:
            max_laws = int(input("최대 몇 개의 법령을 가져올까요? (기본값: 100): ") or "100")
        except ValueError:
            max_laws = 100
        
        # 전체 법령 검색 및 저장
        saved_count, skipped_count, updated_count = search_and_save_laws(
            keyword=None, 
            max_laws=max_laws,
            update_existing=update_existing
        )
        print(f"처리 완료: {saved_count}개 저장, {updated_count}개 갱신, {skipped_count}개 건너뜀")
    
    elif choice == "4":
        # 갱신할 법령 키워드 입력
        keyword = input("갱신할 법령 키워드를 입력하세요 (모든 법령 갱신: 엔터): ")
        
        # 최대 갱신할 법령 수 입력
        try:
            max_laws = int(input("최대 몇 개의 법령을 갱신할까요? (기본값: 20): ") or "20")
        except ValueError:
            max_laws = 20
        
        # 법령 검색 및 갱신
        saved_count, skipped_count, updated_count = search_and_save_laws(
            keyword=keyword, 
            max_laws=max_laws,
            update_existing=True  # 갱신 모드에서는 무조건 갱신
        )
        print(f"갱신 완료: {updated_count}개 갱신, {saved_count}개 새로 저장")
    
    else:
        print("잘못된 선택입니다.")

if __name__ == "__main__":
    main() 