import * as mongoose from 'mongoose';
import {StatusEnum} from 'src/utils/enums/status.enum';
import {validateEmail} from 'src/utils/validations/email-validation';

export const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'COMPANY_NAME_IS_BLANK'],
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      validate: [validateEmail, 'Please enter a valid email'],
      required: [true, 'EMAIL_IS_BLANK'],
    },
    phone: {
      type: String,
      required: [true, 'PHONE_IS_BLANK'],
    },
    fax: {
      type: String,
      required: [true, 'PHONE_IS_BLANK'],
    },
    status: {
      type: StatusEnum,
      required: true,
    },
    address: {},
    isRegisteredAsCompany: {
      type: Boolean,
      required: true,
    },
    companyName: {
      type: String,
    },
    businessRegNumber: {
      type: String,
    },
    companyId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
