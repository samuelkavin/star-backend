import * as mongoose from 'mongoose';
import {RaceEnum, ReligionEnum, GenderEnum} from 'src/utils/enums';
import {validateEmail} from 'src/utils/validations/email-validation';

export const ParentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    nric: {
      type: String,
      required: true,
    },
    race: {
      type: RaceEnum,
      required: true,
    },
    religion: {
      type: ReligionEnum,
      required: true,
    },
    gender: {
      type: GenderEnum,
      required: true,
    },
    phone: {
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
    studentId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
