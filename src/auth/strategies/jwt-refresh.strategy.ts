import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  // The request type uses a hack to not create an extension in types/express/index.d.ts
  // If I need to expand further, I will do it right
  async validate(
    request: Omit<Request, 'body'> & { body: { refresh: string } },
    payload: JwtPayload,
  ) {
    // TODO: fix 401 http code for valid request
    const refreshToken = request.body.refresh;
    await this.authService.compareRefreshTokens(payload.userId, refreshToken);
  }
}
