import { OTPUtil } from './otp';

describe('OTPUtil 클래스 테스트', () => {
  describe('generateSecret 메서드', () => {
    test('기본 길이(20바이트)의 시크릿 키 생성', () => {
      const secret = OTPUtil.generateSecret();
      // Base32 인코딩된 20바이트는 32자 + 패딩('=')
      // 패딩은 8의 배수 길이를 맞추기 위해 추가됨
      expect(secret.length).toBe(32);
      expect(secret).toMatch(/^[A-Z2-7]+=*$/);
    });

    test('사용자 지정 길이(10바이트)의 시크릿 키 생성', () => {
      const secret = OTPUtil.generateSecret(10);
      // Base32 인코딩된 10바이트는 16자 + 패딩('=')
      expect(secret.length).toBe(16);
      expect(secret).toMatch(/^[A-Z2-7]+=*$/);
    });
  });

  describe('base32Encode 메서드와 base32Decode 메서드', () => {
    test('인코딩 및 디코딩 테스트', () => {
      // 테스트할 원본 데이터
      const originalData = Buffer.from('Hello, OTP!');
      
      // Base32 인코딩
      const encoded = OTPUtil.base32Encode(originalData);
      expect(encoded).toMatch(/^[A-Z2-7]+=*$/);
      
      // Base32 디코딩
      const decoded = OTPUtil.base32Decode(encoded);
      
      // 원본 데이터와 디코딩된 데이터가 일치하는지 확인
      expect(Buffer.compare(originalData, decoded)).toBe(0);
    });

    test('다양한 길이의 데이터 인코딩 및 디코딩', () => {
      // 다양한 길이의 테스트 데이터
      const testCases = [
        Buffer.from('A'),
        Buffer.from('AB'),
        Buffer.from('ABC'),
        Buffer.from('ABCD'),
        Buffer.from('ABCDE'),
      ];

      testCases.forEach(original => {
        const encoded = OTPUtil.base32Encode(original);
        const decoded = OTPUtil.base32Decode(encoded);
        expect(Buffer.compare(original, decoded)).toBe(0);
      });
    });
  });

  describe('Base32 인코딩 엣지 케이스', () => {
    test('빈 데이터 인코딩 및 디코딩', () => {
      const emptyBuffer = Buffer.alloc(0);
      const encoded = OTPUtil.base32Encode(emptyBuffer);
      expect(encoded).toBe('');
      
      const decoded = OTPUtil.base32Decode(encoded);
      expect(decoded.length).toBe(0);
    });

    test('패딩이 있는 인코딩 문자열 디코딩', () => {
      // 패딩이 있는 예시
      const encoded = 'MZXW6===';  // 'foo' 문자열의 인코딩
      const decoded = OTPUtil.base32Decode(encoded);
      expect(decoded.toString()).toBe('foo');
    });
  });

  describe('시크릿 키 생성 및 Base32 인코딩 통합 테스트', () => {
    test('생성된 시크릿 키가 유효한 Base32 형식인지 확인', () => {
      for (let i = 0; i < 5; i++) {
        const secret = OTPUtil.generateSecret();
        // 생성된 시크릿 키가 Base32 형식인지 확인
        expect(secret).toMatch(/^[A-Z2-7]+=*$/);
        
        // 디코딩 과정에서 오류가 발생하지 않는지 확인
        expect(() => {
          OTPUtil.base32Decode(secret);
        }).not.toThrow();
      }
    });
  });

  describe('HOTP 메서드', () => {
    test('알려진 테스트 벡터를 사용한 HOTP 생성 검증', () => {
      // RFC 4226의 테스트 벡터를 사용
      // 테스트 시크릿: "12345678901234567890" (ASCII)
      const secretAscii = '12345678901234567890';
      const secretBuffer = Buffer.from(secretAscii, 'ascii');
      const secret = OTPUtil.base32Encode(secretBuffer);

      // RFC 4226의 테스트 벡터 (카운터 값과 예상되는 6자리 HOTP 코드)
      const testVectors = [
        { counter: 0, expected: '755224' },
        { counter: 1, expected: '287082' },
        { counter: 2, expected: '359152' },
        { counter: 3, expected: '969429' },
        { counter: 4, expected: '338314' },
        { counter: 5, expected: '254676' },
        { counter: 6, expected: '287922' },
        { counter: 7, expected: '162583' },
        { counter: 8, expected: '399871' },
        { counter: 9, expected: '520489' }
      ];

      testVectors.forEach(vector => {
        const hotp = OTPUtil.generateHOTP(secret, vector.counter);
        expect(hotp).toBe(vector.expected);
      });
    });

    test('다양한 자릿수의 HOTP 생성', () => {
      const secret = OTPUtil.generateSecret();
      const counter = 42;

      // 다양한 자릿수 테스트
      const digits6 = OTPUtil.generateHOTP(secret, counter, 6);
      expect(digits6.length).toBe(6);
      expect(digits6).toMatch(/^\d{6}$/);

      const digits8 = OTPUtil.generateHOTP(secret, counter, 8);
      expect(digits8.length).toBe(8);
      expect(digits8).toMatch(/^\d{8}$/);
    });
  });

  describe('TOTP 메서드', () => {
    beforeEach(() => {
      // 테스트에서 Date.now를 모킹하여 일관된 결과를 얻을 수 있게 함
      jest.spyOn(Date, 'now').mockImplementation(() => 1622000000000); // 2021-05-26 03:33:20 UTC
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('TOTP 생성 및 검증', () => {
      const secret = OTPUtil.generateSecret();
      
      // 현재 시간 기준 TOTP 생성
      const totp = OTPUtil.generateTOTP(secret);
      
      // 생성된 TOTP가 6자리 숫자인지 확인
      expect(totp.length).toBe(6);
      expect(totp).toMatch(/^\d{6}$/);
      
      // 생성된 TOTP가 유효한지 검증
      expect(OTPUtil.verifyTOTP(totp, secret)).toBe(true);
      
      // 잘못된 TOTP 검증
      const wrongTotp = (parseInt(totp) + 1).toString().padStart(6, '0');
      expect(OTPUtil.verifyTOTP(wrongTotp, secret)).toBe(false);
    });

    test('다양한 파라미터로 TOTP 생성 및 검증', () => {
      const secret = OTPUtil.generateSecret();
      
      // 8자리 TOTP, 60초 주기
      const totp = OTPUtil.generateTOTP(secret, 8, 60);
      
      // 생성된 TOTP가 8자리 숫자인지 확인
      expect(totp.length).toBe(8);
      expect(totp).toMatch(/^\d{8}$/);
      
      // 같은 파라미터로 검증
      expect(OTPUtil.verifyTOTP(totp, secret, 8, 60)).toBe(true);
      
      // 다른 파라미터로 검증 (실패해야 함)
      expect(OTPUtil.verifyTOTP(totp, secret)).toBe(false); // 기본 파라미터(6자리, 30초)
    });

    test('시간 창(window) 테스트', () => {
      const secret = OTPUtil.generateSecret();
      const period = 30;
      
      // 현재 카운터
      const currentCounter = Math.floor(Date.now() / 1000 / period);
      
      // 이전 카운터로 TOTP 생성
      const prevTotp = OTPUtil.generateHOTP(secret, currentCounter - 1);
      
      // 다음 카운터로 TOTP 생성
      const nextTotp = OTPUtil.generateHOTP(secret, currentCounter + 1);
      
      // 기본 창(window=1)으로 검증
      expect(OTPUtil.verifyTOTP(prevTotp, secret)).toBe(true);
      expect(OTPUtil.verifyTOTP(nextTotp, secret)).toBe(true);
      
      // 창 없이(window=0) 검증
      expect(OTPUtil.verifyTOTP(prevTotp, secret, 6, 30, 0)).toBe(false);
      expect(OTPUtil.verifyTOTP(nextTotp, secret, 6, 30, 0)).toBe(false);
      
      // 더 넓은 창(window=2)으로 검증
      const prevPrevTotp = OTPUtil.generateHOTP(secret, currentCounter - 2);
      expect(OTPUtil.verifyTOTP(prevPrevTotp, secret)).toBe(false); // window=1이므로 실패
      expect(OTPUtil.verifyTOTP(prevPrevTotp, secret, 6, 30, 2)).toBe(true); // window=2이므로 성공
    });
  });
}); 