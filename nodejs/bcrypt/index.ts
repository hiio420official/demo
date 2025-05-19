import * as bcrypt from 'bcrypt';

export class BcryptUtil {
  private static readonly SALT_ROUNDS = 10;

  /**
   * 비밀번호를 해시화합니다.
   * @param password 원본 비밀번호
   * @returns 해시화된 비밀번호
   */
  public static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('비밀번호 해시화 중 오류가 발생했습니다.');
    }
  }

  /**
   * 비밀번호가 해시와 일치하는지 검증합니다.
   * @param password 원본 비밀번호
   * @param hashedPassword 해시화된 비밀번호
   * @returns 일치 여부
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error('비밀번호 검증 중 오류가 발생했습니다.');
    }
  }

  /**
   * 비밀번호의 강도를 검사합니다.
   * @param password 검사할 비밀번호
   * @returns 강도 점수 (0-100)
   */
  public static checkPasswordStrength(password: string): number {
    let score = 0;
    
    // 길이 검사
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    
    // 대문자 포함
    if (/[A-Z]/.test(password)) score += 20;
    
    // 소문자 포함
    if (/[a-z]/.test(password)) score += 20;
    
    // 숫자 포함
    if (/[0-9]/.test(password)) score += 20;
    
    // 특수문자 포함
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    
    return Math.min(score, 100);
  }
}
