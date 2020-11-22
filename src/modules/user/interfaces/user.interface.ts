import {Document} from 'mongoose';

// export interface User extends Document {
//   email: string;
//   mobileNumber: string;
//   password: string;
// }

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobileNumber: string;
  password: string;
  verification?: string;
  verified?: boolean;
  verificationExpires?: string;
  loginAttempts?: string;
  blockExpires?: string;
}

export interface VerifyEmail {
  email: string;
  mobileNumber: string;
  verification?: string;
  verified?: boolean;
}

// export interface UserDocument extends User, Document {}
