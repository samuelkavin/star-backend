import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {addHours} from 'date-fns';
// import { v4 } from 'uuid';
import * as crypto from 'crypto';

import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {User, VerifyEmail} from './interfaces/user.interface';
import {VerifyUserDto} from './dto/verify-user.dto';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserService {
  HOURS_TO_VERIFY = 4;
  HOURS_TO_BLOCK = 6;
  LOGIN_ATTEMPTS_TO_BLOCK = 5;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = new this.userModel(createUserDto);
    await this.isEmailUnique(user.email);
    await this.isMobileNumberUnique(user.mobile);
    await this.setRegistrationInfo(user);
    await user.save();
    // await sendEmail(user);
    return this.buildRegistrationInfo(user);
  }

  async verifyUserAccount(verifyUserDto: VerifyUserDto) {
    const user = await this.findByVerification(verifyUserDto);
    await this.setUserAsVerified(user);

    return {
      email: user.email,
      verified: user.verified,
    };
  }

  async signin(loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);
    this.isUserBlocked(user);
    await this.checkPassword(loginUserDto.password, user);
    await this.passwordsAreMatch(user);
    const accessToken = await this.authService.createAccessToken(user._id);
    return {
      email: user.email,
      accessToken,
    };
  }

  //   private methods
  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({email});
    if (user) {
      throw new BadRequestException('Email must be unique.');
    }
  }

  private async isMobileNumberUnique(mobileNumber: string) {
    const user = await this.userModel.findOne({mobileNumber});
    if (user) {
      throw new BadRequestException('Mobile number must be unique.');
    }
  }

  private setRegistrationInfo(user): any {
    // user.verification = v4();
    crypto.randomBytes(3, function(err, buffer) {
      user.verificationCode = parseInt(buffer.toString('hex'), 16)
        .toString()
        .substr(0, 6);
    });
    user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);
  }

  private buildRegistrationInfo(user): any {
    const {firstname, lastname, email, verified} = user;
    const userRegistrationInfo = {
      fullName: `${firstname} ${lastname}`,
      email,
      verified,
    };
    return userRegistrationInfo;
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({email});

    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  private async checkPassword(attemptPass: string, user) {
    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }

  private isUserBlocked(user) {
    if (user.blockExpires > Date.now()) {
      throw new ConflictException('User has been blocked try later.');
    }
  }

  private async passwordsAreMatch(user) {
    user.loginAttempts = 0;
    await user.save();
  }

  private async findByVerification(verifications: VerifyEmail): Promise<User> {
    const {mobile, email, verificationCode} = verifications;
    const user = await this.userModel.findOne({
      mobile,
      email,
      verificationCode,
    });

    console.log('user1', user);

    if (!user) {
      throw new BadRequestException('Bad request.');
    }

    if (user.verified) {
      throw new BadRequestException('User already verified');
    }
    return user;
  }

  private async setUserAsVerified(user) {
    user.verified = true;
    await user.save();
  }
}
