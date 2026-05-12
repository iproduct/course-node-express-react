export type UserRole = 'admin' | 'author' | 'reader'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface Blog {
  id: number
  title: string
  content: string
  userId: number
  category: string
  published: boolean
}

export interface BlogFilters {
  q: string
  userId: string
  category: string
  published: string
}
