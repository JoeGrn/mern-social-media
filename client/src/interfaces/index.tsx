export interface IPost {
    body: string
    commentCount: number
    comments: Array<Comment>
    createdAt: string
    id: string
    likeCount: number
    likes: Array<string>
    username: string
}

export interface IComment {
    body: string
    createdAt: string
    id: string
    username: string
}

export interface ILike {
    username: string
}

export interface IAuthUser {
    login: Function
    logout: Function
    user: IUser | null
    username?: string

}

export interface IUser {
    email: string
    exp: number
    iat: number
    id: string
    username: string
}