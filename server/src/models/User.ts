import { model, Schema } from 'mongoose'

import { IUser } from '../interfaces';

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

export default model<IUser>('User', userSchema)