export interface AuthResponse {
    accessToken: string
    refreshToken: string
    expiresIn: number
    isFirstLogin: boolean
    userInfo: UserInfo
    tokenType: string
}

export interface UserInfo {
    id: number
    ypareoId: string
    ypareoLogin: string
    email: string | null
    firstName: string
    lastName: string
    fullName: string
    isFirstLogin: boolean
    isActive: boolean
    lastLogin: string
    createdAt: string
    rolename: string
}