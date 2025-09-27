export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
  roles: Role[]
}
export enum Role {
  User = 'User',
  Admin = 'Admin'
}
