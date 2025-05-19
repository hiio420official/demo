import { BcryptUtil } from './index';

async function main() {
  try {
    // 1. 비밀번호 해시화 예제
    const password = 'MySecurePassword123!';
    console.log('원본 비밀번호:', password);
    
    const hashedPassword = await BcryptUtil.hashPassword(password);
    console.log('해시화된 비밀번호:', hashedPassword);
    
    // 2. 비밀번호 검증 예제
    const isValid = await BcryptUtil.comparePassword(password, hashedPassword);
    console.log('비밀번호 검증 결과:', isValid);
    
    // 3. 잘못된 비밀번호 검증 예제
    const wrongPassword = 'WrongPassword123!';
    const isInvalid = await BcryptUtil.comparePassword(wrongPassword, hashedPassword);
    console.log('잘못된 비밀번호 검증 결과:', isInvalid);
    
    // 4. 비밀번호 강도 검사 예제
    const weakPassword = '1234';
    const mediumPassword = 'Password123';
    const strongPassword = 'SecurePassword123!@#';
    
    console.log('\n비밀번호 강도 검사 결과:');
    console.log('약한 비밀번호 강도:', BcryptUtil.checkPasswordStrength(weakPassword));
    console.log('중간 비밀번호 강도:', BcryptUtil.checkPasswordStrength(mediumPassword));
    console.log('강한 비밀번호 강도:', BcryptUtil.checkPasswordStrength(strongPassword));
    
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// 예제 실행
main();
