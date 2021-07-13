import * as mongoose from 'mongoose';
import {validateEmail} from 'src/utils/validations/email-validation';

export const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    myKid: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
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
    address: {},
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
