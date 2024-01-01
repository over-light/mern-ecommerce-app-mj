export interface userInterface {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    mobile: string
}



export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    role: string
  }

export interface SignupResponseProps {
    success: boolean
    message: string
    user: User
}