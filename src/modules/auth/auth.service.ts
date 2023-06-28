import { BadRequestException, Injectable } from '@nestjs/common';
import { FakeAuthRepository } from '../../../test/auth/auth.service.spec';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

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

    const access_token = this.generateJwt(user.id, 'access_token');
    const refresh_token = this.generateJwt(user.id, 'refresh_token');
    return { access_token, refresh_token };
  }

  generateJwt(UserId: number, key: string) {
    let jwtSecret: string;
    let jwtExpire: string;

    if (key === 'access_token') {
      jwtSecret = 'accessMock';
      jwtExpire = '10000s';

      const access_token = this.jwtService.sign(
        { UserId },
        { secret: jwtSecret, expiresIn: jwtExpire },
      );
      return access_token;
    }

    if (key === 'refresh_token') {
      jwtSecret = 'refreshMock';
      jwtExpire = '20000s';
      const refresh_token = this.jwtService.sign(
        { UserId },
        { secret: jwtSecret, expiresIn: jwtExpire },
      );
      return refresh_token;
    }
  }
}
