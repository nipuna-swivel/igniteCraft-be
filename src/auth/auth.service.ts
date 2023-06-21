import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}
  async login(loginDto): Promise<any> {
    const admin = await this.adminService.getAdminByName(loginDto.username);
    if (!admin) {
      throw new UnauthorizedException();
    }
    const isMatched = bcrypt.compareSync(loginDto.password, admin.password);
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    /* @ts-ignore */
    const payload = { sub: admin._id, username: admin.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  logout() {}
}
