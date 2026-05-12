export type UserRole = 'admin' | 'author' | 'reader'

export interface User {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  imageUrl: string
}

export interface Blog {
  id: number
  title: string
  content: string
  userId: number
  category: string
  published: boolean
  imageUrl: string
  keywords: string[]
}

export interface BlogFilters {
  q: string
  userId: string
  category: string
  published: string
}
