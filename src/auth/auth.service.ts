import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(jshshir: string, password: string) {
    const user = await this.userService.findByJshshir(jshshir);
    if (!user) throw new UnauthorizedException('Foydalanuvchi mavjud emas');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Parol xato');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id, jshshir: user.jshshir, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(user._id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async refreshToken(oldToken: string) {
    try {
      const payload = this.jwtService.verify(oldToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findById(payload.sub);
      if (!user || user.refreshToken !== oldToken)
        throw new UnauthorizedException('Yaroqsiz refresh token');
      return this.login(user);
    } catch {
      throw new UnauthorizedException(
        'Refresh token noto‘g‘ri yoki muddati o‘tgan',
      );
    }
  }
}
