import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FakeAuthRepository } from 'test/auth/auth.service.spec';
@Injectable()
export class AuthService {
  authRepository = new FakeAuthRepository();

  async signUp(id: string, password: string) {
    const user = await this.authRepository.findUserById(id);
    if (user) {
      throw new BadRequestException('이미 존재하는 아이디 입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.createUser(id, hashedPassword);
    return;
  }
}
