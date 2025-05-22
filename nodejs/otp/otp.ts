import * as crypto from 'crypto';
import * as QRCode from 'qrcode';

/**
 * OTP 생성 및 검증을 위한 유틸리티 클래스
 */
export class OTPUtil {
  /**
   * 랜덤 시크릿 키를 생성하고 Base32로 인코딩합니다.
   * @param length 생성할 시크릿 키의 바이트 길이 (기본값: 20)
   * @returns Base32로 인코딩된 시크릿 키
   */
  static generateSecret(length: number = 20): string {
    const buffer = crypto.randomBytes(length);
    return this.base32Encode(buffer);
  }

  /**
   * 바이너리 데이터를 Base32로 인코딩합니다.
   * @param buffer 인코딩할 바이너리 데이터
   * @returns Base32로 인코딩된 문자열
   */
  static base32Encode(buffer: Buffer): string {
    // Base32 인코딩에 사용되는 문자셋 (RFC 4648)
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    
    // 5비트씩 처리하여 Base32 인코딩 수행
    let bits = 0;
    let value = 0;
    
    for (let i = 0; i < buffer.length; i++) {
      value = (value << 8) | buffer[i];
      bits += 8;
      
      while (bits >= 5) {
        bits -= 5;
        result += charset[(value >>> bits) & 31];
      }
    }
    
    // 남은 비트가 있으면 처리
    if (bits > 0) {
      result += charset[(value << (5 - bits)) & 31];
    }
    
    // 패딩 추가 (8의 배수 길이로 맞추기)
    while (result.length % 8 !== 0) {
      result += '=';
    }
    
    return result;
  }

  /**
   * Base32로 인코딩된 문자열을 디코딩합니다.
   * @param encoded Base32로 인코딩된 문자열
   * @returns 디코딩된 바이너리 데이터
   */
  static base32Decode(encoded: string): Buffer {
    // Base32 디코딩을 위한 문자셋 매핑
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const charsetMap: { [key: string]: number } = {};
    for (let i = 0; i < charset.length; i++) {
      charsetMap[charset[i]] = i;
    }
    
    // 패딩 제거
    const cleanInput = encoded.toUpperCase().replace(/=+$/, '');
    
    const length = Math.floor(cleanInput.length * 5 / 8);
    const result = Buffer.alloc(length);
    
    let bits = 0;
    let value = 0;
    let index = 0;
    
    for (let i = 0; i < cleanInput.length; i++) {
      const char = cleanInput[i];
      if (char in charsetMap) {
        value = (value << 5) | charsetMap[char];
        bits += 5;
        
        if (bits >= 8) {
          bits -= 8;
          result[index++] = (value >>> bits) & 0xff;
        }
      }
    }
    
    return result;
  }

  /**
   * 현재 시간 기반의 OTP 코드를 생성합니다. (TOTP)
   * @param secret Base32로 인코딩된 시크릿 키
   * @param digits 생성할 OTP 코드의 자릿수 (기본값: 6)
   * @param period 코드 갱신 주기 (초 단위, 기본값: 30)
   * @returns 생성된 OTP 코드
   */
  static generateTOTP(secret: string, digits: number = 6, period: number = 30): string {
    // 현재 시간을 Unix 타임스탬프(초)로 변환하고 period로 나눔
    const counter = Math.floor(Date.now() / 1000 / period);
    return this.generateHOTP(secret, counter, digits);
  }

  /**
   * 카운터 기반의 OTP 코드를 생성합니다. (HOTP)
   * @param secret Base32로 인코딩된 시크릿 키
   * @param counter OTP 생성에 사용될 카운터 값
   * @param digits 생성할 OTP 코드의 자릿수 (기본값: 6)
   * @returns 생성된 OTP 코드
   */
  static generateHOTP(secret: string, counter: number, digits: number = 6): string {
    // 시크릿 키를 디코딩
    const decodedSecret = this.base32Decode(secret);
    
    // 카운터를 8바이트 버퍼로 변환
    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
      buffer[7 - i] = counter & 0xff;
      counter = counter >> 8;
    }
    
    // HMAC-SHA1 해시 계산
    const hmac = crypto.createHmac('sha1', decodedSecret);
    const hash = hmac.update(buffer).digest();
    
    // 동적 truncation
    const offset = hash[hash.length - 1] & 0xf;
    const binary =
      ((hash[offset] & 0x7f) << 24) |
      ((hash[offset + 1] & 0xff) << 16) |
      ((hash[offset + 2] & 0xff) << 8) |
      (hash[offset + 3] & 0xff);
    
    // 지정된 자릿수로 잘라내기
    const otp = binary % Math.pow(10, digits);
    
    // 앞에 0을 채워 자릿수 맞추기
    return otp.toString().padStart(digits, '0');
  }

  /**
   * TOTP 코드의 유효성을 검증합니다.
   * @param token 검증할 OTP 코드
   * @param secret Base32로 인코딩된 시크릿 키
   * @param digits OTP 코드의 자릿수 (기본값: 6)
   * @param period 코드 갱신 주기 (초 단위, 기본값: 30)
   * @param window 앞뒤로 검증할 시간 창 (기본값: 1, 총 검증 범위: -window ~ +window)
   * @returns 유효한 코드인 경우 true, 그렇지 않으면 false
   */
  static verifyTOTP(
    token: string,
    secret: string,
    digits: number = 6,
    period: number = 30,
    window: number = 1
  ): boolean {
    const currentCounter = Math.floor(Date.now() / 1000 / period);
    
    // 앞뒤 시간 창을 고려하여 검증
    for (let i = -window; i <= window; i++) {
      const counter = currentCounter + i;
      const generatedToken = this.generateHOTP(secret, counter, digits);
      
      if (token === generatedToken) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * OTP 인증을 위한 QR 코드 이미지 URL을 생성합니다.
   * @param issuer 발급자 이름 (서비스 제공자 이름)
   * @param accountName 계정 이름 (사용자 식별자)
   * @param secret Base32로 인코딩된 시크릿 키
   * @param options QR 코드 생성 옵션
   * @returns QR 코드 이미지의 Data URL 문자열 (Promise)
   */
  static async generateQRCodeDataURL(
    issuer: string,
    accountName: string,
    secret: string,
    options: {
      digits?: number;
      period?: number;
      algorithm?: string;
      qrOptions?: QRCode.QRCodeToDataURLOptions;
    } = {}
  ): Promise<string> {
    const { digits = 6, period = 30, algorithm = 'SHA1', qrOptions = {} } = options;
    
    // otpauth URI 생성
    // 포맷: otpauth://totp/ISSUER:ACCOUNT_NAME?secret=SECRET&issuer=ISSUER&algorithm=ALGORITHM&digits=DIGITS&period=PERIOD
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedAccountName = encodeURIComponent(accountName);
    const uri = `otpauth://totp/${encodedIssuer}:${encodedAccountName}?secret=${secret}&issuer=${encodedIssuer}&algorithm=${algorithm}&digits=${digits}&period=${period}`;
    
    // QR 코드 이미지 URL 생성
    const defaultQROptions: QRCode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'M',
      margin: 4,
      width: 200,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      ...qrOptions
    };
    
    try {
      const dataURL = await QRCode.toDataURL(uri, defaultQROptions);
      return dataURL;
    } catch (error) {
      throw new Error(`QR 코드 생성 실패: ${error}`);
    }
  }
  
  /**
   * OTP 인증을 위한 otpauth URI를 생성합니다.
   * @param issuer 발급자 이름 (서비스 제공자 이름)
   * @param accountName 계정 이름 (사용자 식별자)
   * @param secret Base32로 인코딩된 시크릿 키
   * @param options URI 생성 옵션
   * @returns otpauth URI 문자열
   */
  static generateOTPAuthURI(
    issuer: string,
    accountName: string,
    secret: string,
    options: {
      digits?: number;
      period?: number;
      algorithm?: string;
    } = {}
  ): string {
    const { digits = 6, period = 30, algorithm = 'SHA1' } = options;
    
    // otpauth URI 생성
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedAccountName = encodeURIComponent(accountName);
    return `otpauth://totp/${encodedIssuer}:${encodedAccountName}?secret=${secret}&issuer=${encodedIssuer}&algorithm=${algorithm}&digits=${digits}&period=${period}`;
  }
}
