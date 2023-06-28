import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';
import * as bcrypt from 'bcrypt';
export class FakeAuthRepository {
  async findUserByUserId(id: string) {
    const password = '1234';
    const hashedPassword = await bcrypt.hash(password, 10);
    if (id === 'test1') {
      return {
        id: 1,
        userId: 'test1',
        password: hashedPassword,
      };
    }
    return;
  }

  async createUser(id: string, password: string) {
    return;
  }
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, FakeAuthRepository],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('signUp이 존재하는지', () => {
      expect(authService.signUp).toBeDefined();
    });

    it('이미 존재하는 id일 경우 - 실패', async () => {
      const id = 'test1';
      const password = 'asdf';
      await expect(authService.signUp(id, password)).rejects.toThrowError(
        new BadRequestException('이미 존재하는 아이디 입니다'),
      );
    });

    it('signUp()의 리턴값이 null인지 확인', async () => {
      const id = 'test999';
      const password = 'asdf';
      const result = await authService.signUp(id, password);
      expect(result).toBeNull;
    });
  });

  describe('login', () => {
    it('입력받은 아이디가 존재하지 않는 경우 - 실패', async () => {
      const id = 'test999';
      const password = 'asdf';

      await expect(authService.login(id, password)).rejects.toThrowError(
        new BadRequestException('아이디 혹은 비밀번호를 다시 확인해 주세요'),
      );
    });

    it('입력받은 비밀번호가 아이디의 비밀번호와 일치하지 않는 경우 - 실패', async () => {
      const id = 'test1';
      const password = '1111';

      await expect(authService.login(id, password)).rejects.toThrowError(
        new BadRequestException('아이디 혹은 비밀번호를 다시 확인해 주세요'),
      );
    });

    it('로그인이 성공적으로 되었을 경우 Jwt를 리턴한다 - 성공', async () => {
      const id = 'test1';
      const password = '1234';

      const result = await authService.login(id, password);
    });
  });
});
