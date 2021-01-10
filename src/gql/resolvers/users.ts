import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';

import User from '../../models/User';
import { generateToken } from '../../util/generateToken';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../util/validators';

interface User {
  username: String;
  email: String;
  password: string;
  confirmPassword: String;
}

export default {
  Mutation: {
    async register(parent: any, args: any) {
      const {
        username,
        password,
        confirmPassword,
        email,
      } = args.registerInput;

      const { isValid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
      );
      if (!isValid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username Taken', {
          errors: {
            username: 'Username Taken',
          },
        });
      }

      const hashedPassword: String = await bcrypt.hash(password, 12);

      const newUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const registeredUser: any = await newUser.save();

      const token: any = generateToken(registeredUser);

      return {
        ...registeredUser._doc,
        id: registeredUser._id,
        token
      };
    },
    async login(parent: any, args: any) {
      const { username, password } = args.loginInput;
      const { isValid, errors } = validateLoginInput(username, password);

      if (!isValid) {
        throw new UserInputError('Errors', { errors });
      }

      const user: any = await User.findOne({ username });

      if (!user) {
        errors.general = 'Username not found';
        throw new UserInputError('Invalid Username', { errors });
      }

      const match: any = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Invalid Password';
        throw new UserInputError('Invalid Password', { errors });
      }

      const token: any = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
  },
};
