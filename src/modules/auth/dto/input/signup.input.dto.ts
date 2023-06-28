import { IsString, Length } from 'class-validator';

export class SignupInputDto {
  @IsString()
  @Length(4, 8)
  userId: string;

  @IsString()
  @Length(6, 12)
  password: string;
}
