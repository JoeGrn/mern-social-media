export interface IContext {
    req: {
        headers: {
            authorization: string
        }
    }
}

export interface IUser {
    id: string
    email: string
    username: string
}

export interface IErrors {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
}

export interface IRegisterInput {
    username: string
    email: string
    password: string
    confirmPassword: string
}
export interface ILoginInput {
    username: string
    password: string
}
