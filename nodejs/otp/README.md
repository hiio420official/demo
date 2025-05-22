# OTP 인증 유틸리티

Google Authenticator 호환 OTP(One-Time Password) 인증 구현을 위한 TypeScript 유틸리티입니다.

## 개요

본 프로젝트는 계정 로그인 시 2차인증(2FA)을 위한 OTP 데모입니다. TOTP(Time-based One-Time Password) 알고리즘을 사용하여 Google Authenticator와 같은 표준 인증 앱에서 사용할 수 있는 일회용 비밀번호를 생성하고 검증합니다.

## 주요 기능

- RFC 4226 표준을 준수하는 HOTP(HMAC-based One-Time Password) 구현
- RFC 6238 표준을 준수하는 TOTP(Time-based One-Time Password) 구현
- Base32 인코딩/디코딩 지원
- 시크릿 키 생성 기능
- 시간 창(window) 기반 유연한 코드 검증
- Google Authenticator용 QR 코드 생성 기능

## 설치 방법

```bash
# 패키지 설치
npm install

# 테스트 실행
npm test

# 예제 실행
npm run example
```

## 사용 예제

### 시크릿 키 생성

```typescript
import { OTPUtil } from './otp';

// 기본 길이(20바이트)의 시크릿 키 생성
const secret = OTPUtil.generateSecret();
console.log('생성된 시크릿 키:', secret);

// 사용자 지정 길이(10바이트)의 시크릿 키 생성
const customLengthSecret = OTPUtil.generateSecret(10);
console.log('사용자 지정 길이 시크릿 키:', customLengthSecret);
```

### TOTP 생성 및 검증

```typescript
import { OTPUtil } from './otp';

// 시크릿 키 생성
const secret = OTPUtil.generateSecret();

// TOTP 코드 생성 (기본값: 6자리, 30초 주기)
const totp = OTPUtil.generateTOTP(secret);
console.log('생성된 TOTP 코드:', totp);

// 사용자 입력 코드 검증
const isValid = OTPUtil.verifyTOTP(totp, secret);
console.log('코드 유효성:', isValid ? '유효함' : '유효하지 않음');

// 커스텀 파라미터로 TOTP 생성 (8자리, 60초 주기)
const customTotp = OTPUtil.generateTOTP(secret, 8, 60);
console.log('커스텀 TOTP 코드:', customTotp);
```

### QR 코드 생성

```typescript
import { OTPUtil } from './otp';

// 시크릿 키 생성
const secret = OTPUtil.generateSecret();

// OTP 인증을 위한 URI 생성
const uri = OTPUtil.generateOTPAuthURI('서비스명', 'user@example.com', secret);
console.log('OTPAuth URI:', uri);

// QR 코드 이미지 URL 생성 (기본 옵션)
const qrDataURL = await OTPUtil.generateQRCodeDataURL('서비스명', 'user@example.com', secret);

// 커스텀 옵션으로 QR 코드 생성
const customQRDataURL = await OTPUtil.generateQRCodeDataURL(
  '서비스명', 
  'user@example.com', 
  secret, 
  {
    digits: 8,  // 8자리 OTP 코드
    period: 60, // 60초 갱신 주기
    qrOptions: {
      width: 300,
      margin: 2,
      color: {
        dark: '#0033A0',  // QR 코드 색상
        light: '#F8F9FA'  // 배경 색상
      }
    }
  }
);

// QR 코드 이미지를 파일로 저장
const base64Data = qrDataURL.split(',')[1];
const qrImageBuffer = Buffer.from(base64Data, 'base64');
fs.writeFileSync('otp_qrcode.png', qrImageBuffer);
```

## 기술 스택

- TypeScript
- Node.js
- Jest (테스트 프레임워크)
- QRCode (QR 코드 생성)

## 보안 관련 참고사항

- 시크릿 키는 안전하게 저장해야 합니다 (암호화된 데이터베이스 등 활용)
- 사용자별로 고유한 시크릿 키를 생성하여 사용해야 합니다
- 클라이언트와 서버 간 시간 동기화 이슈가 발생할 수 있으므로, 적절한 시간 창(window) 설정이 중요합니다
- QR 코드를 통해 시크릿 키를 공유할 때는 안전한 채널을 사용하세요

## Google Authenticator 연동

1. 사용자별 고유한 시크릿 키를 생성합니다.
2. OTPUtil.generateQRCodeDataURL() 함수로 QR 코드를 생성합니다.
3. 사용자에게 QR 코드를 보여주고 Google Authenticator 앱으로 스캔하도록 안내합니다.
4. 사용자가 로그인할 때, Google Authenticator 앱에서 생성된 OTP 코드를 입력하도록 합니다.
5. OTPUtil.verifyTOTP() 함수로 입력된 코드의 유효성을 검증합니다.

## RFC 표준 참조

- [RFC 4226 - HOTP: HMAC-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc4226)
- [RFC 6238 - TOTP: Time-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc6238)
- [RFC 4648 - Base32 인코딩](https://tools.ietf.org/html/rfc4648)

## 라이센스

ISC