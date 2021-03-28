import { Document } from 'mongoose';

export interface IUser extends Document {
    id: string
    email: string
    username: string
    password: string
    _doc: {}
    _id: string
}

export interface IPost extends Document {
    id: string
    body: string
    createdAt: string
    username: string
    comments: Array<IComment>
    likes: Array<ILike>
    likeCount: number
    commentCount: number
}

export interface ILike {
    id?: string
    createdAt: string
    username: string
}

export interface IComment {
    id?: string
    createdAt?: string
    username: string
    body: string
}

export interface IErrors {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
}

export interface IContext {
    req: {
        headers: {
            authorization: string
        }
    }
}

export interface IRegisterArgs {
    username: string
    email: string
    password: string
    confirmPassword: string
}
export interface ILoginArgs {
    loginInput: {
        username: string
        password: string
    }   
}

export interface ICreateCommentArgs {
    postId: string
    body: string
}

export interface IDeleteCommentArgs {
    postId: string
    commentId: string
}

export interface ICreatePostArgs {
    body: string
}

export interface IDeletePostArgs {
    postId: string
}

export interface ILikePostArgs {
    postId: string
}
export interface IGetPostArgs {
    postId: string
}