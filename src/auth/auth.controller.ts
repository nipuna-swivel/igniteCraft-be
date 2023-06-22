import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    //  private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  public jwtToken = { access_token: '' };
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    const jwt = await this.authService.login('');
    this.jwtToken = jwt;
    return 'successfully logout';
  }
}
