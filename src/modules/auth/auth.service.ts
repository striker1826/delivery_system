import { BadRequestException, Injectable } from '@nestjs/common';
import { FakeAuthRepository } from '../../../test/auth/auth.service.spec';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  authRepository = new FakeAuthRepository();

  async signUp(id: string, password: string) {
    const user = await this.authRepository.findUserByUserId(id);
    if (user) {
      throw new BadRequestException('이미 존재하는 아이디 입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.createUser(id, hashedPassword);
    return;
  }

  async login(id: string, password: string) {
    const user = await this.authRepository.findUserByUserId(id);
    if (!user) {
      throw new BadRequestException(
        '아이디 혹은 비밀번호를 다시 확인해 주세요',
      );
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new BadRequestException(
        '아이디 혹은 비밀번호를 다시 확인해 주세요',
      );
    }
  }
}
