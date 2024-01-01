export interface userInterface {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    mobile: string
}

export interface LoginProps {
    email: string,
    password: string
}
export interface VerifyUserProps {
    id: string | undefined, 
    token: string | undefined
}

export interface ForgotPasswordProps {
    email: string
}

export interface UpdatePasswordProps{
    userId: string | undefined,
    password: string,
    token: string | undefined
}