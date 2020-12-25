import * as mongoose from 'mongoose';
import {GenderEnum} from 'src/utils/enums/gender.enum';
import {RaceEnum} from 'src/utils/enums/race.enum';
import {validateEmail} from 'src/utils/validations/email-validation';
export const DirectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'COMPANY_NAME_IS_BLANK'],
    },
    nric: {
      type: String,
      required: [true, 'COMPANY_REG_NUM_IS_BLANK'],
    },
    gender: {
      type: GenderEnum,
      required: true,
    },
    race: {
      type: RaceEnum,
      required: true,
    },
    designation: {
      type: String,
      required: [true, 'DESIGNATION_IS_BLANK'],
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
      required: [true, 'MOBILE_IS_BLANK'],
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
