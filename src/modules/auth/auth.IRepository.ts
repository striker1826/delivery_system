import { UserOutputDto } from './dto/output/User.output.dto';

export interface IAuthRepository {
  findUserByUserId(UserId: string): Promise<UserOutputDto>;
  createUser(id: string, password: string): Promise<void>;
}

export const IAuthRepository = Symbol('IAuthRepository');
