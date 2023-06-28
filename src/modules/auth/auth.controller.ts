import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInputDto } from './dto/input/signup.input.dto';
import { JwtOutputDto } from './dto/output/jwt.output.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignupInputDto): Promise<void> {
    await this.authService.signUp(body);
    return;
  }

  @Post('/login')
  async login(@Body() body: SignupInputDto): Promise<JwtOutputDto> {
    const result = await this.authService.login(body);
    return result;
  }
}
