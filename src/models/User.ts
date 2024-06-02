import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         active:
 *           type: boolean
 *           description: The user's account is active or not
 *         profile_picture:
 *           type: string
 *           description: The user's profile picture
 *         role:
 *           type: string
 *           description: The user's role
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: password123
 *         role: STUDENT
 */

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
  profile_picture: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  createdAt: Date;
  updatedAt: Date;
  passwordResetToken?: string;
  passwordResetExpireTime?: Date;
  passwordChangedAt?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator(value: string) {
        return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      },
      message: 'please enter a valid email',
    },
  },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['ADMIN', 'TEACHER', 'STUDENT'] },
  active: { type: Boolean, default: true, select: false },
  profile_picture: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  passwordResetToken: String,
  passwordResetExpireTime: Date,
  passwordChangedAt: Date,
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12)
  next();
});


const User = model<IUser>('User', userSchema);



export default User;
