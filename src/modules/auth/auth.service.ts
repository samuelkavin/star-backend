import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../user/interfaces/user.interface';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {RefreshToken} from './interfaces/refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(userId: string) {
    const accessToken = this.jwtService.sign({userId});
    return accessToken;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({_id: jwtPayload.userId, verified: true});
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }
}
