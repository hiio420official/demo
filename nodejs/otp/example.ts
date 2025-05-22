import { OTPUtil } from './otp';
import * as fs from 'fs';
import * as path from 'path';

/**
 * OTP 유틸리티 사용 예제
 */

// 1. 시크릿 키 생성 예제
console.log('===== 시크릿 키 생성 예제 =====');
const secret = OTPUtil.generateSecret();
console.log(`생성된 시크릿 키: ${secret}`);

// 사용자 정의 길이 시크릿 키 생성
const customLengthSecret = OTPUtil.generateSecret(10);
console.log(`사용자 정의 길이(10 바이트) 시크릿 키: ${customLengthSecret}`);
console.log();

// 2. Base32 인코딩/디코딩 예제
console.log('===== Base32 인코딩/디코딩 예제 =====');
const originalText = 'Hello, OTP World!';
const buffer = Buffer.from(originalText, 'utf-8');
const encoded = OTPUtil.base32Encode(buffer);
console.log(`원본 텍스트: ${originalText}`);
console.log(`Base32 인코딩: ${encoded}`);

const decoded = OTPUtil.base32Decode(encoded);
console.log(`Base32 디코딩: ${decoded.toString('utf-8')}`);
console.log();

// 3. HOTP 생성 예제
console.log('===== HOTP 생성 예제 =====');
// HOTP 값은 카운터에 따라 변경됨
const counter = 42;
const hotp = OTPUtil.generateHOTP(secret, counter);
console.log(`카운터(${counter})에 대한 HOTP 코드: ${hotp}`);

// 다양한 자릿수의 HOTP 생성
const hotp8Digits = OTPUtil.generateHOTP(secret, counter, 8);
console.log(`8자리 HOTP 코드: ${hotp8Digits}`);
console.log();

// 4. TOTP 생성 및 검증 예제
console.log('===== TOTP 생성 및 검증 예제 =====');
const totp = OTPUtil.generateTOTP(secret);
console.log(`현재 시간 기준 TOTP 코드: ${totp}`);
console.log(`TOTP 코드 검증 결과: ${OTPUtil.verifyTOTP(totp, secret) ? '유효함' : '유효하지 않음'}`);

// 잘못된 코드 검증
const wrongTotp = (parseInt(totp) + 1).toString().padStart(6, '0');
console.log(`잘못된 TOTP 코드: ${wrongTotp}`);
console.log(`잘못된 TOTP 코드 검증 결과: ${OTPUtil.verifyTOTP(wrongTotp, secret) ? '유효함' : '유효하지 않음'}`);
console.log();

// 5. 다양한 설정으로 TOTP 생성
console.log('===== 다양한 설정의 TOTP 예제 =====');
// 8자리, 60초 주기
const customTotp = OTPUtil.generateTOTP(secret, 8, 60);
console.log(`8자리, 60초 주기 TOTP 코드: ${customTotp}`);
console.log(`커스텀 TOTP 코드 검증 결과: ${OTPUtil.verifyTOTP(customTotp, secret, 8, 60) ? '유효함' : '유효하지 않음'}`);

// 다른 설정으로 검증(실패 예상)
console.log(`기본 설정으로 검증한 결과: ${OTPUtil.verifyTOTP(customTotp, secret) ? '유효함' : '유효하지 않음'}`);
console.log();

// 6. 실제 인증 과정 시뮬레이션
console.log('===== 실제 인증 과정 시뮬레이션 =====');
// 사용자 등록 시: 서버에서 시크릿 키 생성 후 사용자에게 제공 및 저장
const userSecret = OTPUtil.generateSecret();
console.log(`사용자 등록 시 생성된 시크릿 키: ${userSecret}`);

// 사용자가 인증 앱으로 현재 TOTP 코드 생성 (클라이언트 측)
const userTotp = OTPUtil.generateTOTP(userSecret);
console.log(`사용자 인증 앱의 TOTP 코드: ${userTotp}`);

// 서버에서 사용자가 입력한 TOTP 코드 검증
console.log(`서버 측 TOTP 코드 검증 결과: ${OTPUtil.verifyTOTP(userTotp, userSecret) ? '로그인 성공' : '로그인 실패'}`);

// 시간 지연을 시뮬레이션하기 위해 이전/이후 시간대의 코드 생성
const currentCounter = Math.floor(Date.now() / 1000 / 30);
const prevTotp = OTPUtil.generateHOTP(userSecret, currentCounter - 1);
console.log(`이전 시간대 TOTP 코드: ${prevTotp}`);
console.log(`이전 시간대 코드 검증 결과: ${OTPUtil.verifyTOTP(prevTotp, userSecret) ? '로그인 성공' : '로그인 실패'}`);
console.log();

// 7. QR 코드 생성 예제
console.log('===== QR 코드 생성 예제 =====');
// OTP 인증을 위한 URI 생성
const uri = OTPUtil.generateOTPAuthURI('MyService', 'user@example.com', secret);
console.log(`OTPAuth URI: ${uri}`);

// QR 코드 생성 및 저장
(async () => {
  try {
    // QR 코드 이미지 URL 생성 (기본 옵션)
    const qrDataURL = await OTPUtil.generateQRCodeDataURL('MyService', 'user@example.com', secret);
    console.log(`QR 코드 이미지 URL 생성 완료 (길이: ${qrDataURL.length}자)`);
    console.log(`QR 코드 미리보기: ${qrDataURL.substring(0, 50)}...`);

    // 커스텀 옵션으로 QR 코드 생성
    const customQRDataURL = await OTPUtil.generateQRCodeDataURL(
      '나의서비스', 
      'user123', 
      secret, 
      {
        digits: 8,
        period: 60,
        qrOptions: {
          width: 300,
          margin: 2,
          color: {
            dark: '#0033A0',  // 어두운 색상 (QR 코드 패턴)
            light: '#F8F9FA'  // 밝은 색상 (배경)
          }
        }
      }
    );
    console.log(`커스텀 QR 코드 이미지 URL 생성 완료`);

    // QR 코드 이미지를 파일로 저장 (옵션)
    // Data URL에서 Base64 부분만 추출하여 파일로 저장
    const base64Data = qrDataURL.split(',')[1];
    const qrImageBuffer = Buffer.from(base64Data, 'base64');
    
    // 'qrcodes' 디렉토리가 없으면 생성
    const qrDir = 'qrcodes';
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir);
    }
    
    fs.writeFileSync(path.join(qrDir, 'otp_qrcode.png'), qrImageBuffer);
    console.log(`QR 코드 이미지가 ${path.join(qrDir, 'otp_qrcode.png')}에 저장되었습니다`);
    
    // 커스텀 QR 코드도 저장
    const customBase64Data = customQRDataURL.split(',')[1];
    const customQRImageBuffer = Buffer.from(customBase64Data, 'base64');
    fs.writeFileSync(path.join(qrDir, 'custom_otp_qrcode.png'), customQRImageBuffer);
    console.log(`커스텀 QR 코드 이미지가 ${path.join(qrDir, 'custom_otp_qrcode.png')}에 저장되었습니다`);
    
    console.log('\n이제 Google Authenticator나 다른 OTP 앱에서 QR 코드를 스캔하여 인증 코드를 생성할 수 있습니다.');
  } catch (error) {
    console.error('QR 코드 생성 중 오류 발생:', error);
  }
})(); 