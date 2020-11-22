import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {UserSchema} from '../user/schemas/user.schema';
import {AuthService} from './auth.service';
import {RefreshTokenSchema} from './schemas/refresh-token.schema';
import {JwtStrategy} from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'RefreshToken', schema: RefreshTokenSchema},
    ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'starProject01',
      signOptions: {expiresIn: 3600},
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
