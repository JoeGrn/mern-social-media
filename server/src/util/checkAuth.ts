import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server'

import { JWT_KEY } from '../constants'
import { IContext } from '../interfaces'

const checkAuth = (context: IContext): any => {
    const authHeader: string = context.req.headers.authorization;
    if (authHeader) {
        const token: string = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, JWT_KEY)
                return user
            } catch (e) {
                throw new AuthenticationError('Invalid token')
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]\'')
    }
    throw new Error('Authentication header must be provided')
}

export default checkAuth;