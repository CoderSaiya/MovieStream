import { Permission, UserRole } from "./auth"

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    permissions: Permission[]
    createdAt: Date
}