export type UserRole = 'user' | 'admin' | 'moderator'

export interface Permission {
    action: 'create' | 'read' | 'update' | 'delete'
    subject: 'movie' | 'comment' | 'user' | 'payment' | 'report'
}

export interface DecodeToken {
    id: string
    role: UserRole
    permissions: Permission[]
    iat: number
    exp: number
}