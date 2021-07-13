import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      maxlength: 255,
      required: [true, 'FIRST_NAME_IS_REQUIRED'],
    },
    lastname: {
      type: String,
      lowercase: true,
      maxlength: 255,
      required: [true, 'LAST_NAME_IS_REQUIRED'],
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
      required: [true, 'MOBILE_NUM_IS_BLANK'],
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: [true, 'PASSWORD_IS_BLANK'],
    },
    verificationCode: {
      type: String,
      // validate: validator.isUUID,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: Date.now,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
    companyId: [{type: Schema.Types.ObjectId, ref: 'Company'}],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
