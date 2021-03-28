import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server'

import { JWT_KEY } from '../constants'
import { IContext, IUser } from '../interfaces'

const checkAuth = (context: IContext): IUser => {
    const authHeader: string = context.req.headers.authorization;
    if (authHeader) {
        const token: string = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const markerUser: object | string = jwt.verify(token, JWT_KEY)
                const user = <IUser> markerUser
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