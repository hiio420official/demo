# Bcrypt 유틸리티 클래스

안전한 비밀번호 관리를 위한 TypeScript Bcrypt 유틸리티 클래스입니다.

## 설치 방법

```bash
npm install bcrypt @types/bcrypt
```

## 주요 기능

1. **비밀번호 해시화**
   - 안전한 salt 생성
   - 비밀번호 해시화
   - 에러 처리

2. **비밀번호 검증**
   - 원본 비밀번호와 해시화된 비밀번호 비교
   - 비동기 처리
   - 에러 처리

3. **비밀번호 강도 검사**
   - 길이 검사
   - 대문자/소문자 포함 여부
   - 숫자 포함 여부
   - 특수문자 포함 여부
   - 0-100 점수 반환

## 사용 예제

```typescript
import { BcryptUtil } from './index';

// 비밀번호 해시화
const hashedPassword = await BcryptUtil.hashPassword('myPassword123');

// 비밀번호 검증
const isValid = await BcryptUtil.comparePassword('myPassword123', hashedPassword);

// 비밀번호 강도 검사
const strength = BcryptUtil.checkPasswordStrength('myPassword123');
```

## API 문서

### BcryptUtil.hashPassword(password: string): Promise<string>
- 비밀번호를 해시화합니다.
- 매개변수: 원본 비밀번호
- 반환값: 해시화된 비밀번호

### BcryptUtil.comparePassword(password: string, hashedPassword: string): Promise<boolean>
- 비밀번호가 해시와 일치하는지 검증합니다.
- 매개변수: 원본 비밀번호, 해시화된 비밀번호
- 반환값: 일치 여부

### BcryptUtil.checkPasswordStrength(password: string): number
- 비밀번호의 강도를 검사합니다.
- 매개변수: 검사할 비밀번호
- 반환값: 강도 점수 (0-100)

## 보안 고려사항

- SALT_ROUNDS는 10으로 설정되어 있어 적절한 보안성과 성능의 균형을 유지합니다.
- 모든 비밀번호 관련 작업은 try-catch로 예외 처리가 되어 있습니다.
- 비밀번호 강도 검사 기능으로 사용자에게 안전한 비밀번호 설정을 유도합니다.

## 라이선스

MIT
