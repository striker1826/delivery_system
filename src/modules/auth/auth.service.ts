import { BadRequestException, Injectable } from '@nestjs/common';
import { fakeAuthRepository } from '../../../test/auth/auth.service.spec';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  async signUp(id: string, password: string) {
    const user = await fakeAuthRepository.findUserById(id);
    if (user) {
      throw new BadRequestException('이미 존재하는 아이디 입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await fakeAuthRepository.createUser(id, hashedPassword);
    return;
  }
}
