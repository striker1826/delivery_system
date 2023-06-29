import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { IAuthRepository } from './auth.IRepository';
import { UserOutputDto } from './dto/output/User.output.dto';

export class AuthRepository implements IAuthRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async findUserByUserId(UserId: string): Promise<UserOutputDto> {
    const result = await this.userModel
      .createQueryBuilder('user')
      .where('user.userId = :UserId', { UserId })
      .getOne();

    return plainToInstance(UserOutputDto, result);
  }

  async createUser(userId: string, password: string): Promise<void> {
    const newUser = this.userModel.create();
    newUser.userId = userId;
    newUser.password = password;
    await this.userModel.save(newUser);
    return;
  }
}
