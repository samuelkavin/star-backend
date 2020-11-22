// import {Schema} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {validateEmail} from 'src/utils/validations/email-validation';
import {StatusEnum} from '../interfaces/company.interface';
const Schema = mongoose.Schema;
export const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'COMPANY_NAME_IS_BLANK'],
    },
    businessRegNumber: {
      type: String,
      required: [true, 'COMPANY_REG_NUM_IS_BLANK'],
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      unique: true,
      validate: [validateEmail, 'Please enter a valid email'],
      required: [true, 'EMAIL_IS_BLANK'],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'PHONE_IS_BLANK'],
    },
    fax: {
      type: String,
      unique: true,
      required: [true, 'PHONE_IS_BLANK'],
    },
    status: {
      type: StatusEnum,
      required: true,
    },
    preferredLanguage: {
      type: String,
      required: true,
    },
    address: {},
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
