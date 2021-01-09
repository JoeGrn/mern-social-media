import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';

export const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_KEY,
    { expiresIn: '1h' },
  );

  return token;
}
