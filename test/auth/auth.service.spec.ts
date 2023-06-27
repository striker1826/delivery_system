import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';

export class FakeAuthRepository {
  async findUserById(id: string) {
    if (id === 'test1') {
      return {
        id: 1,
        userId: 'test1',
        password: '1234',
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
      const id = 'test2';
      const password = 'asdf';
      const result = await authService.signUp(id, password);
      expect(result).toBeNull;
    });
  });
});
