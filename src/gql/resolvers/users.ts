import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_KEY } from '../../constants';
import User from '../../models/User';

// interface RegisterInput {
//   registerInput: {
//     username: String;
//     email: String;
//     password: string;
//     confirmPassword: String;
//   };
// }

export default {
  Mutation: {
    async register(parent: any, registerInput: any, context: any, info: any) {
      const {
        username,
        password,
        confirmPassword,
        email,
      } = registerInput.registerInput;
      const hashedPassword: String = await bcrypt.hash(password, 12);

      const newUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const response: any = await newUser.save();

      const token = jwt.sign(
        {
          id: response.id,
          email: response.email,
          username: response.username
        },
        JWT_KEY,
        { expiresIn: '1h' },
      );

      return {
        ...response._doc,
        id: response._id,
        token,
      };
    },
  },
};
