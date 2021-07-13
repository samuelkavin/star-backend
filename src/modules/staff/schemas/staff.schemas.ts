import * as mongoose from 'mongoose';
import {validateEmail} from 'src/utils/validations/email-validation';
export const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nric: {
      type: String,
      required: true,
    },
    race: {
      type: String,
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
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    personalEmail: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    bankDetails: {},
    employmentDetails: {},
    address: {},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
